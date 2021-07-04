import React, { createRef, useState } from "react"
import { Keyboard, TextInput, ViewProps } from "react-native"

import { InputPassword } from "../InputPassword"
import { CenterScreen, SpaceScreen } from "../Screen"
import { useKeyboard } from "../../service/hook"


export interface AddPinProps extends ViewProps {
    onDone: (pin: string) => void,
}


export function AddPin(props: AddPinProps) {


    const inputPasswordPin = createRef<TextInput>()

    const [pinValue, setPinValue] = useState("")


    useKeyboard("keyboardDidHide", () => {
        if (inputPasswordPin.current?.isFocused()) {
            inputPasswordPin.current.blur()
        }
    })


    return (
        <SpaceScreen {...props}>
            <CenterScreen>
                <InputPassword
                    ref={inputPasswordPin}
                    autoFocus={true}
                    textAlign={"center"}
                    keyboardType={"number-pad"}
                    returnKeyType={"done"}
                    placeholder={"Digite seu PIN"}
                    value={pinValue}
                    onChangeText={(newText: string) => setPinValue(newText)}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                        props.onDone(pinValue)
                        setPinValue("")
                    }}
                />
            </CenterScreen>
        </SpaceScreen>
    )
}
