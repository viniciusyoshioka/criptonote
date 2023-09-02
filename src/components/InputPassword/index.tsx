import { ForwardedRef, forwardRef, useState } from "react"
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, View } from "react-native"

import { translate } from "@locales"
import { Input, InputProps } from "../Input"
import { ToggleVisibilityButton } from "./ToggleVisibilityButton"


export interface InputPasswordProps extends InputProps {}


export const InputPassword = forwardRef((props: InputPasswordProps, ref: ForwardedRef<TextInput>) => {


    const [hidePassword, setHidePassword] = useState(true)
    const [isFocused, setIsFocused] = useState(false)

    const isPasswordHidden = props.secureTextEntry ?? hidePassword


    function onFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(true)
        if (props.onFocus) props.onFocus(e)
    }

    function onBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(false)
        if (props.onBlur) props.onBlur(e)
    }


    function togglePasswordVisibility() {
        if (props.secureTextEntry === undefined) setHidePassword(!hidePassword)
    }


    return (
        <View style={styles.wrapper}>
            <Input
                {...props}
                ref={ref}
                autoCapitalize={"none"}
                autoComplete={"new-password"}
                autoCorrect={false}
                placeholder={translate("password")}
                secureTextEntry={isPasswordHidden}
                keyboardType={isPasswordHidden ? "default" : "visible-password"}
                isFocused={isFocused}
                onFocus={onFocus}
                onBlur={onBlur}
                style={[ { flex: 1, borderTopRightRadius: 0 }, props.style]}
            />

            <ToggleVisibilityButton
                hidePassword={isPasswordHidden}
                isFocused={isFocused}
                onPress={togglePasswordVisibility}
            />
        </View>
    )
})


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
})
