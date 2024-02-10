import { Screen } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Realm } from "@realm/react"
import { NavigationParamProps, RouteParamProps } from "@router"
import { useRef, useState } from "react"
import { Alert, StatusBar, TextInput } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

import { Input, LoadingModal } from "@components"
import { NoteContentSchema, NoteSchema, useNoteRealm } from "@database"
import { useBackHandler, useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"
import { Crypto } from "@services/crypto"
import { log, stringifyError } from "@services/log"
import { EditNoteHeader } from "./Header"


export { ChangePassword } from "./ChangePassword"


export function EditNote() {


    const navigation = useNavigation<NavigationParamProps<"EditNote">>()
    const { params } = useRoute<RouteParamProps<"EditNote">>()

    const textInputRef = useRef<TextInput>(null)

    const noteRealm = useNoteRealm()

    const [title, setTitle] = useState(params.note.title)
    const [text, setText] = useState(params.note.text)
    const [hasChanges, setHasChanges] = useState(false)
    const [showNoteSavingModal, setShowNoteSavingModal] = useState(false)
    const [showDeletingNoteModal, setShowDeletingNoteModal] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })

    useBlurInputOnKeyboardDismiss([textInputRef])


    function setNewTitle(newTitle: string) {
        setTitle(newTitle)
        setHasChanges(true)
    }

    function setNewText(newText: string) {
        setText(newText)
        setHasChanges(true)
    }


    function goBack(isNoteSaved?: boolean) {
        if (showNoteSavingModal) return

        if (hasChanges && !isNoteSaved) {
            alertUnsavedChanges()
            return
        }

        navigation.goBack()
    }

    function alertUnsavedChanges() {
        Alert.alert(
            translate("warn"),
            translate("EditNote_alert_unsavedChanges_text"),
            [
                { text: translate("cancel") },
                { text: translate("ok"), onPress: navigation.goBack },
            ]
        )
    }

    async function saveNote() {
        if (title.length === 0 && text.length === 0) {
            alertEmptyNote()
            return
        }

        try {
            setShowNoteSavingModal(true)

            const noteId = Realm.BSON.ObjectId.createFromHexString(params.note.id)
            const note = noteRealm.objectForPrimaryKey(NoteSchema, noteId) as NoteSchema
            const noteContent = noteRealm.objectForPrimaryKey(NoteContentSchema, note.textId) as NoteContentSchema

            const encryptedText = await Crypto.encryptString(text, params.password.trim())

            noteRealm.beginTransaction()
            noteContent.text = encryptedText
            note.title = title
            note.modifiedAt = Date.now()
            noteRealm.commitTransaction()

            goBack(true)
        } catch (error) {
            if (noteRealm.isInTransaction) {
                noteRealm.cancelTransaction()
            }

            log.error(`Error saving note: ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate("EditNote_alert_errorSavingNote_text"),
            )
        } finally {
            setShowNoteSavingModal(false)
        }
    }

    function alertEmptyNote() {
        Alert.alert(
            translate("warn"),
            translate("EditNote_alert_discardEmptyNote_text"),
            [
                { text: translate("cancel") },
                { text: translate("ok"), onPress: deleteEmptyNote },
            ]
        )
    }

    function deleteEmptyNote() {
        try {
            setShowDeletingNoteModal(true)

            const noteId = Realm.BSON.ObjectId.createFromHexString(params.note.id)
            const note = noteRealm.objectForPrimaryKey(NoteSchema, noteId) as NoteSchema
            const noteContent = noteRealm.objectForPrimaryKey(NoteContentSchema, note.textId) as NoteContentSchema

            noteRealm.beginTransaction()
            noteRealm.delete(note)
            noteRealm.delete(noteContent)
            noteRealm.commitTransaction()

            goBack(true)
        } catch (error) {
            if (noteRealm.isInTransaction) {
                noteRealm.cancelTransaction()
            }

            log.error(`Error deleting empty note: ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate("EditNote_alert_errorDeletingEmptyNote_text"),
            )
        } finally {
            setShowDeletingNoteModal(false)
        }
    }

    function changePassword() {
        if (hasChanges) {
            Alert.alert(
                translate("warn"),
                translate("EditNote_alert_saveNoteBeforeChanginPassword_text")
            )
            return
        }

        navigation.navigate("ChangePassword", {
            noteId: params.note.id,
            currentPassword: params.password,
        })
    }

    function deleteNote() {
        try {
            setShowDeletingNoteModal(true)

            const noteId = Realm.BSON.ObjectId.createFromHexString(params.note.id)
            const note = noteRealm.objectForPrimaryKey(NoteSchema, noteId) as NoteSchema
            const noteContent = noteRealm.objectForPrimaryKey(NoteContentSchema, note.textId) as NoteContentSchema

            noteRealm.beginTransaction()
            noteRealm.delete(note)
            noteRealm.delete(noteContent)
            noteRealm.commitTransaction()

            goBack(true)
        } catch (error) {
            if (noteRealm.isInTransaction) {
                noteRealm.cancelTransaction()
            }

            log.error(`Error deleting note: ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate("EditNote_alert_errorDeletingNote_text")
            )
        } finally {
            setShowDeletingNoteModal(false)
        }
    }

    function alertDeleteNote() {
        Alert.alert(
            translate("warn"),
            translate("EditNote_alert_deleteNote_text"),
            [
                { text: translate("cancel") },
                { text: translate("ok"), onPress: deleteNote },
            ]
        )
    }


    return (
        <Screen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={"padding"}
                keyboardVerticalOffset={-(StatusBar.currentHeight ?? 0)}
            >
                <EditNoteHeader
                    goBack={() => goBack()}
                    title={title}
                    onChangeTitle={setNewTitle}
                    onSubmitTitle={() => textInputRef.current?.focus()}
                    saveNote={saveNote}
                    changePassword={changePassword}
                    deleteNote={alertDeleteNote}
                />

                <Input
                    ref={textInputRef}
                    value={text}
                    onChangeText={setNewText}
                    placeholder={translate("EditNote_textPlaceholder")}
                    autoCapitalize={"sentences"}
                    multiline={true}
                    textAlignVertical={"top"}
                    style={{ flex: 1, paddingVertical: 16 }}
                />

                <LoadingModal
                    visible={showNoteSavingModal}
                    message={translate("EditNote_savingNote")}
                />

                <LoadingModal
                    visible={showDeletingNoteModal}
                    message={translate("EditNote_deletingNote")}
                />
            </KeyboardAvoidingView>
        </Screen>
    )
}
