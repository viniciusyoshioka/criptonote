import React, { createRef, useEffect, useState } from "react"
import { Keyboard, TextInput } from "react-native"

import { InputPassword, ShowPasswordButton, ViewInputPassword } from "../../component/InputPassword"
import { ModalButton, ModalTitle, ModalViewButton, ModalViewContent } from "../../component/ModalComponent"
import { ModalFullscreen, ModalFullscreenProps } from "../../component/ModalFullscreen"
import { useKeyboard } from "../../service/hook"


export interface ChangePasswordProps extends ModalFullscreenProps {
    changePassword: () => void,
}


export function ChangePassword(props: ChangePasswordProps) {


    const inputCurrentPassword = createRef<TextInput>()
    const inputNewPassword = createRef<TextInput>()
    const inputConfirmNewPassword = createRef<TextInput>()

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
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
            setShowCurrentPassword(false)
            setShowNewPassword(false)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmNewPassword("")
        }
    }, [props.visible])


    return (
        <ModalFullscreen {...props}>
            <>
                <ModalTitle>
                    Mudar senha
                </ModalTitle>

                <ModalViewContent>
                    <ViewInputPassword>
                        <InputPassword
                            autoFocus={true}
                            placeholder={"Senha atual"}
                            showPassword={showCurrentPassword}
                            value={currentPassword}
                            onChangeText={(newText: string) => setCurrentPassword(newText)}
                            onSubmitEditing={() => inputNewPassword.current?.focus()}
                            ref={inputCurrentPassword}
                        />

                        <ShowPasswordButton
                            showPassword={showCurrentPassword}
                            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                        />
                    </ViewInputPassword>

                    <ViewInputPassword>
                        <InputPassword
                            placeholder={"Nova senha"}
                            showPassword={showNewPassword}
                            value={newPassword}
                            onChangeText={(newText: string) => setNewPassword(newText)}
                            onSubmitEditing={() => inputConfirmNewPassword.current?.focus()}
                            ref={inputNewPassword}
                        />

                        <ShowPasswordButton
                            showPassword={showNewPassword}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        />
                    </ViewInputPassword>

                    <ViewInputPassword>
                        <InputPassword
                            placeholder={"Confirmar nova senha"}
                            returnKeyType={"done"}
                            showPassword={showNewPassword}
                            value={confirmNewPassword}
                            onChangeText={(newText: string) => setConfirmNewPassword(newText)}
                            onSubmitEditing={Keyboard.dismiss}
                            ref={inputConfirmNewPassword}
                        />
                    </ViewInputPassword>
                </ModalViewContent>

                <ModalViewButton>
                    <ModalButton
                        text={"Cancelar"}
                        onPress={() => props.setVisible(false)}
                    />

                    <ModalButton
                        text={"Ok"}
                        onPress={() => {
                            props.changePassword()
                            props.setVisible(false)
                        }}
                    />
                </ModalViewButton>
            </>
        </ModalFullscreen>
    )
}
