import React, { forwardRef, Ref, useState } from "react"
import { TextInput, TextInputProps } from "react-native"

import { Input } from "../Input"
import { ShowPasswordButton } from "./ShowPasswordButton"
import { ViewInputPassword } from "./ViewInputPassword"


export const InputPassword = forwardRef((props: TextInputProps, ref?: Ref<TextInput>) => {


    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)


    return (
        <ViewInputPassword>
            <Input
                autoCapitalize={"none"}
                autoComplete={"off"}
                autoCorrect={false}
                keyboardType={showPassword ? "visible-password" : undefined}
                placeholder={"Senha"}
                ref={ref}
                returnKeyType={"next"}
                secureTextEntry={!showPassword}
                style={{
                    flex: 1,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                }}
                onBlur={(e) => {
                    setIsFocused(false)
                    if (props.onBlur) {
                        props.onBlur(e)
                    }
                }}
                onFocus={(e) => {
                    setIsFocused(true)
                    if (props.onFocus) {
                        props.onFocus(e)
                    }
                }}
                isFocused={isFocused}
                {...props}
            />

            <ShowPasswordButton
                showPassword={showPassword}
                onPress={() => setShowPassword(!showPassword)}
                isFocused={isFocused}
            />
        </ViewInputPassword>
    )
})
