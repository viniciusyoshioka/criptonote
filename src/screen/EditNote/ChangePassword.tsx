import { Button, ModalActions, ModalContainer, ModalContent, ModalScrim, ModalTitle } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Realm } from "@realm/react"
import { useRef, useState } from "react"
import { Alert, TextInput } from "react-native"

import { InputPassword, LoadingModal } from "@components"
import { NoteContentSchema, NoteSchema, useNoteRealm } from "@database"
import { useBackHandler, useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps, RouteParamProps } from "@router"
import { Crypto } from "@services/crypto"
import { log, stringifyError } from "@services/log"


export function ChangePassword() {


    const navigation = useNavigation<NavigationParamProps<"ChangePassword">>()
    const { params } = useRoute<RouteParamProps<"ChangePassword">>()

    const inputCurrentPasswordRef = useRef<TextInput>(null)
    const inputNewPasswordRef = useRef<TextInput>(null)
    const inputConfirmPasswordRef = useRef<TextInput>(null)

    const noteRealm = useNoteRealm()

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showChangingPassword, setShowChangingPassword] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })

    useBlurInputOnKeyboardDismiss([
        inputCurrentPasswordRef,
        inputNewPasswordRef,
        inputConfirmPasswordRef,
    ])


    function goBack() {
        navigation.goBack()
    }

    async function changePassword() {
        if (newPassword.trim() !== confirmPassword.trim()) {
            Alert.alert(
                translate("warn"),
                translate("ChangePassword_alert_newPasswordDoesNotMatch_text")
            )
            return
        }

        try {
            setShowChangingPassword(true)

            const noteId = Realm.BSON.ObjectId.createFromHexString(params.noteId)
            const note = noteRealm.objectForPrimaryKey(NoteSchema, noteId) as NoteSchema
            const noteContent = noteRealm.objectForPrimaryKey(NoteContentSchema, note.textId) as NoteContentSchema

            const decrypedText = currentPassword.trim().length > 0
                ? await Crypto.decryptString(noteContent.text, currentPassword.trim())
                : noteContent.text
            const encryptedText = newPassword.trim().length > 0
                ? await Crypto.encryptString(decrypedText, newPassword.trim())
                : decrypedText

            noteRealm.beginTransaction()
            noteContent.text = encryptedText
            note.modifiedAt = Date.now()
            noteRealm.commitTransaction()

            navigation.popToTop()
        } catch (error) {
            if (noteRealm.isInTransaction) {
                noteRealm.cancelTransaction()
            }

            log.error(`Error changing note password: ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate("ChangePassowrd_alert_errorChangingPassword_text")
            )
        } finally {
            setShowChangingPassword(false)
        }
    }


    return (
        <ModalScrim onPress={goBack}>
            <ModalContainer>
                <ModalTitle>
                    {translate("ChangePassword_title")}
                </ModalTitle>

                <ModalContent hasDivider={false} style={{ marginTop: 16 }}>
                    <InputPassword
                        ref={inputCurrentPasswordRef}
                        placeholder={translate("ChangePassword_currentPassword")}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        returnKeyType={"next"}
                        onSubmitEditing={() => inputNewPasswordRef.current?.focus()}
                        wrapperStyle={{ marginBottom: 8 }}
                    />

                    <InputPassword
                        ref={inputNewPasswordRef}
                        placeholder={translate("ChangePassword_newPassword")}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        returnKeyType={"next"}
                        onSubmitEditing={() => inputConfirmPasswordRef.current?.focus()}
                        wrapperStyle={{ marginBottom: 8 }}
                    />

                    <InputPassword
                        ref={inputConfirmPasswordRef}
                        placeholder={translate("ChangePassword_confirmPassword")}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onSubmitEditing={() => inputConfirmPasswordRef.current?.blur()}
                    />
                </ModalContent>

                <ModalActions>
                    <Button
                        text={translate("cancel")}
                        variant={"text"}
                        onPress={goBack}
                    />

                    <Button
                        text={translate("ok")}
                        variant={"text"}
                        onPress={changePassword}
                    />
                </ModalActions>
            </ModalContainer>

            <LoadingModal
                visible={showChangingPassword}
                message={translate("ChangePassword_changingPassword")}
            />
        </ModalScrim>
    )
}
