import React, { createRef, useState } from "react"
import { Keyboard, TextInput } from "react-native"

import { InputPassword, ShowPasswordButton, ViewInputPassword } from "../../component/InputPassword"
import { CenterScreen, SpaceScreen } from "../../component/Screen"
import { useKeyboard } from "../../service/hook"


export interface AddTextProps {
    onDone: (text: string) => void,
}


export function AddText(props: AddTextProps) {


    const inputPasswordText = createRef<TextInput>()

    const [textValue, setTextValue] = useState("")
    const [showPassword, setShowPassword] = useState(false)


    useKeyboard("keyboardDidHide", () => {
        if (inputPasswordText.current?.isFocused()) {
            inputPasswordText.current.blur()
        }
    })


    return (
        <SpaceScreen>
            <CenterScreen>
                <ViewInputPassword>
                    <InputPassword
                        showPassword={showPassword}
                        ref={inputPasswordText}
                        autoFocus={true}
                        placeholder={"Digite sua senha"}
                        returnKeyType={"done"}
                        value={textValue}
                        onChangeText={(newText: string) => setTextValue(newText)}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                            props.onDone(textValue)
                        }}
                    />

                    <ShowPasswordButton
                        showPassword={showPassword}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                </ViewInputPassword>
            </CenterScreen>
        </SpaceScreen>
    )
}
