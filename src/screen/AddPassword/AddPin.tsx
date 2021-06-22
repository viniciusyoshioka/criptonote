import React, { createRef, useState } from "react"
import { Keyboard, TextInput, useWindowDimensions } from "react-native"

import { Input } from "../../component/Input"
import { CenterScreen } from "../../component/Screen"
import { useKeyboard } from "../../service/hook"


export interface AddPinProps {
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
        <CenterScreen>
            <Input
                autoFocus={true}
                keyboardType={"number-pad"}
                onChangeText={(newText: string) => setPinValue(newText)}
                onSubmitEditing={() => {
                    Keyboard.dismiss()
                    props.onDone(pinValue)
                }}
                placeholder={"Digite seu PIN"}
                ref={inputPasswordPin}
                secureTextEntry={true}
                textAlign={"center"}
                value={pinValue}
                style={{
                    width: useWindowDimensions().width / 1.5
                }}
            />
        </CenterScreen>
    )
}
