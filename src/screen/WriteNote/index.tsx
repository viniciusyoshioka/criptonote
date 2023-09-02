import { Screen } from "@elementium/native"
import { useNavigation } from "@react-navigation/native"
import { useRef, useState } from "react"
import { Alert, TextInput, View } from "react-native"

import { Input, InputPassword, LoadingModal } from "@components"
import { NoteContentSchema, NoteSchema, useNoteRealm } from "@database"
import { useBackHandler, useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { log, stringifyError } from "@services/log"
import { WriteNoteHeader } from "./Header"


export function WriteNote() {


    const navigation = useNavigation<NavigationParamProps<"WriteNote">>()

    const titleInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const textInputRef = useRef<TextInput>(null)

    const noteRealm = useNoteRealm()

    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")
    const [text, setText] = useState("")
    const [showNoteSavingModal, setShowNoteSavingModal] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })

    useBlurInputOnKeyboardDismiss([titleInputRef, passwordInputRef, textInputRef])


    function goBack() {
        if (showNoteSavingModal) return

        if (title.trim().length > 0 || text.trim().length > 0) {
            alertUnsavedChanges()
            return
        }

        navigation.goBack()
    }

    function alertUnsavedChanges() {
        Alert.alert(
            translate("warn"),
            translate("WriteNote_alert_unsavedChanges_text"),
            [
                { text: translate("cancel") },
                { text: translate("ok"), onPress: navigation.goBack },
            ]
        )
    }

    // TODO encrypt note text before saving in the database
    function saveNote() {
        if (title.trim().length === 0 && text.trim().length === 0) {
            alertEmptyNote()
            return
        }

        setShowNoteSavingModal(true)

        try {
            noteRealm.beginTransaction()
            const noteContent = noteRealm.create(NoteContentSchema, {
                text: text.trim(),
            })
            noteRealm.create(NoteSchema, {
                title: title.trim(),
                textId: noteContent.id,
            })
            noteRealm.commitTransaction()
        } catch (error) {
            if (noteRealm.isInTransaction) {
                noteRealm.cancelTransaction()
            }

            log.error(`Error saving new note: ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate("WriteNote_alert_errorSavingNote_text"),
            )
        } finally {
            setShowNoteSavingModal(false)
            goBack()
        }
    }

    function alertEmptyNote() {
        Alert.alert(
            translate("warn"),
            translate("WriteNote_alert_discardEmptyNote_text"),
            [
                { text: translate("ok"), onPress: navigation.goBack },
            ]
        )
    }


    return (
        <Screen>
            <WriteNoteHeader goBack={goBack} saveNote={saveNote} />

            <View style={{ flex: 1, padding: 16, rowGap: 8 }}>
                <Input
                    ref={titleInputRef}
                    value={title}
                    onChangeText={setTitle}
                    placeholder={translate("WriteNote_titlePlaceholder")}
                    autoCapitalize={"sentences"}
                    autoFocus={true}
                    returnKeyType={"next"}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                <InputPassword
                    ref={passwordInputRef}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={translate("WriteNote_passwordPlaceholder")}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoComplete={"new-password"}
                    returnKeyType={"next"}
                    onSubmitEditing={() => textInputRef.current?.focus()}
                />

                <Input
                    ref={textInputRef}
                    value={text}
                    onChangeText={setText}
                    placeholder={translate("WriteNote_textPlaceholder")}
                    autoCapitalize={"sentences"}
                    multiline={true}
                    textAlignVertical={"top"}
                    style={{ flex: 1, paddingVertical: 16 }}
                />
            </View>

            <LoadingModal
                visible={showNoteSavingModal}
                message={translate("WriteNote_savingNote")}
            />
        </Screen>
    )
}
