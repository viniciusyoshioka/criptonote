import React, { forwardRef, Ref } from "react"
import { TextInput, TextInputProps } from "react-native"
import styled from "styled-components/native"

import { Input } from "../Input"
import { ShowPasswordButton, ShowPasswordButtonProps } from "./ShowPasswordButton"
import { ViewInputPassword } from "./ViewInputPassword"


const InputPasswordBase = styled(Input)`
    flex: 1;
`


export interface InputPasswordProps extends TextInputProps {
    showPassword: boolean,
}


export const InputPassword = forwardRef((props: InputPasswordProps, ref?: Ref<TextInput>) => {
    return (
        <InputPasswordBase
            autoCapitalize={"none"}
            autoCompleteType={"off"}
            autoCorrect={false}
            keyboardType={props.showPassword ? "visible-password" : undefined}
            secureTextEntry={!props.showPassword}
            placeholder={"Senha"}
            ref={ref}
            {...props}
        />
    )
})


export { ViewInputPassword }
export type { ShowPasswordButtonProps }
export { ShowPasswordButton }
