import { Screen } from "@elementium/native"
import { useNavigation } from "@react-navigation/native"
import { useRef, useState } from "react"
import { Alert, StatusBar, TextInput, View } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

import { FullInput, InputPassword, LoadingModal } from "@components"
import { NoteContentSchema, NoteSchema, useNoteRealm } from "@database"
import { useBackHandler, useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { Crypto } from "@services/crypto"
import { log, stringifyError } from "@services/log"
import { WriteNoteHeader } from "./Header"


export function WriteNote() {


    const navigation = useNavigation<NavigationParamProps<"WriteNote">>()

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

    useBlurInputOnKeyboardDismiss([passwordInputRef, textInputRef])


    function goBack(isNoteSaved?: boolean) {
        if (showNoteSavingModal) return

        if (!isNoteSaved && (title.length > 0 || text.length > 0)) {
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

    async function saveNote() {
        if (title.length === 0 && text.length === 0) {
            alertEmptyNote()
            return
        }

        try {
            setShowNoteSavingModal(true)

            const encryptedText = await Crypto.encryptString(text, password.trim())

            noteRealm.beginTransaction()
            const noteContent = noteRealm.create(NoteContentSchema, {
                text: encryptedText,
            })
            noteRealm.create(NoteSchema, {
                title: title,
                textId: noteContent.id,
            })
            noteRealm.commitTransaction()

            goBack(true)
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
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={"padding"}
                keyboardVerticalOffset={-(StatusBar.currentHeight ?? 0)}
            >
                <WriteNoteHeader
                    goBack={() => goBack()}
                    title={title}
                    onChangeTitle={setTitle}
                    onSubmitTitle={() => passwordInputRef.current?.focus()}
                    saveNote={saveNote}
                />

                <View style={{ flex: 1, padding: 16, rowGap: 8 }}>
                    <InputPassword
                        ref={passwordInputRef}
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType={"next"}
                        onSubmitEditing={() => textInputRef.current?.focus()}
                    />

                    <FullInput
                        ref={textInputRef}
                        value={text}
                        onChangeText={setText}
                        placeholder={translate("WriteNote_textPlaceholder")}
                        autoCapitalize={"sentences"}
                    />
                </View>

                <LoadingModal
                    visible={showNoteSavingModal}
                    message={translate("WriteNote_savingNote")}
                />
            </KeyboardAvoidingView>
        </Screen>
    )
}
