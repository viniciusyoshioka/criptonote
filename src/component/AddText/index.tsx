import React, { createRef, useState } from "react"
import { Keyboard, TextInput, ViewProps } from "react-native"

import { InputPassword } from "../InputPassword"
import { CenterScreen, SpaceScreen } from "../Screen"
import { useKeyboard } from "../../service/hook"


export interface AddTextProps extends ViewProps {
    onDone: (text: string) => void,
}


export function AddText(props: AddTextProps) {


    const inputPasswordText = createRef<TextInput>()

    const [textValue, setTextValue] = useState("")


    useKeyboard("keyboardDidHide", () => {
        if (inputPasswordText.current?.isFocused()) {
            inputPasswordText.current.blur()
        }
    })


    return (
        <SpaceScreen {...props}>
            <CenterScreen>
                <InputPassword
                    ref={inputPasswordText}
                    autoFocus={true}
                    placeholder={"Digite sua senha"}
                    returnKeyType={"done"}
                    value={textValue}
                    onChangeText={(newText: string) => setTextValue(newText)}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                        props.onDone(textValue)
                        setTextValue("")
                    }}
                />
            </CenterScreen>
        </SpaceScreen>
    )
}
