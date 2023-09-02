import { RefObject } from "react"
import { TextInput } from "react-native"

import { useKeyboard } from "./keyboard"


export function useBlurInputOnKeyboardDismiss(inputs: RefObject<TextInput>[]) {
    useKeyboard("keyboardDidHide", () => {
        inputs.forEach(input => {
            if (input.current?.isFocused()) input.current?.blur()
        })
    })
}
