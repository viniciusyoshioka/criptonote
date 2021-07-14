import React, { createRef, memo, useEffect, useState } from "react"
import { Keyboard, TextInput } from "react-native"

import { InputPassword, ModalButton, ModalTitle, ModalViewButton, ModalViewContent, MyModal, MyModalProps } from "../../component"
import { useKeyboard } from "../../service/hook"


export interface ChangePasswordProps extends MyModalProps {
    changePassword: (currentPassword: string, newPassword: string, confirmNewPassword: string) => void,
}


export const ChangePassword = memo((props: ChangePasswordProps) => {


    const inputCurrentPassword = createRef<TextInput>()
    const inputNewPassword = createRef<TextInput>()
    const inputConfirmNewPassword = createRef<TextInput>()

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")


    useKeyboard("keyboardDidHide", () => {
        if (inputCurrentPassword.current?.isFocused()) {
            inputCurrentPassword.current.blur()
            return
        }

        if (inputNewPassword.current?.isFocused()) {
            inputNewPassword.current.blur()
            return
        }

        if (inputConfirmNewPassword.current?.isFocused()) {
            inputConfirmNewPassword.current.blur()
            return
        }
    })


    useEffect(() => {
        if (!props.visible) {
            setCurrentPassword("")
            setNewPassword("")
            setConfirmNewPassword("")
        }
    }, [props.visible])


    return (
        <MyModal {...props}>
            <>
                <ModalTitle>
                    Mudar senha
                </ModalTitle>

                <ModalViewContent>
                    <InputPassword
                        autoFocus={true}
                        placeholder={"Senha atual"}
                        value={currentPassword}
                        onChangeText={(newText: string) => setCurrentPassword(newText)}
                        onSubmitEditing={() => inputNewPassword.current?.focus()}
                        ref={inputCurrentPassword}
                    />

                    <InputPassword
                        placeholder={"Nova senha"}
                        value={newPassword}
                        onChangeText={(newText: string) => setNewPassword(newText)}
                        onSubmitEditing={() => inputConfirmNewPassword.current?.focus()}
                        ref={inputNewPassword}
                    />

                    <InputPassword
                        placeholder={"Confirmar nova senha"}
                        returnKeyType={"done"}
                        value={confirmNewPassword}
                        onChangeText={(newText: string) => setConfirmNewPassword(newText)}
                        onSubmitEditing={Keyboard.dismiss}
                        ref={inputConfirmNewPassword}
                    />
                </ModalViewContent>

                <ModalViewButton>
                    <ModalButton
                        text={"Cancelar"}
                        onPress={() => props.setVisible(false)}
                    />

                    <ModalButton
                        text={"Ok"}
                        onPress={() => {
                            props.changePassword(currentPassword, newPassword, confirmNewPassword)
                            props.setVisible(false)
                        }}
                    />
                </ModalViewButton>
            </>
        </MyModal>
    )
})
