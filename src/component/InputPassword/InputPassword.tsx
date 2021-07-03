import React, { forwardRef, Ref } from "react"
import { TextInput, TextInputProps } from "react-native"

import { Input } from "../Input"


export interface InputPasswordProps extends TextInputProps {
    showPassword: boolean,
}


export const InputPassword = forwardRef((props: InputPasswordProps, ref?: Ref<TextInput>) => {
    return (
        <Input
            autoCapitalize={"none"}
            autoCompleteType={"off"}
            autoCorrect={false}
            keyboardType={props.showPassword ? "visible-password" : undefined}
            placeholder={"Senha"}
            ref={ref}
            returnKeyType={"next"}
            secureTextEntry={!props.showPassword}
            style={{ flex: 1 }}
            {...props}
        />
    )
})
