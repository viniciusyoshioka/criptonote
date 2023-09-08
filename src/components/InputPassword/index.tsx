import { ForwardedRef, forwardRef, useState } from "react"
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputFocusEventData, View, ViewStyle } from "react-native"

import { translate } from "@locales"
import { Input, InputProps } from "../Input"
import { ToggleVisibilityButton } from "./ToggleVisibilityButton"


export interface InputPasswordProps extends InputProps {
    wrapperStyle?: StyleProp<ViewStyle>;
}


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
        <View style={[styles.wrapper, props.wrapperStyle]}>
            <Input
                autoCapitalize={"none"}
                autoComplete={"new-password"}
                autoCorrect={false}
                placeholder={translate("password")}
                secureTextEntry={isPasswordHidden}
                keyboardType={isPasswordHidden ? "default" : "visible-password"}
                {...props}
                ref={ref}
                isFocused={isFocused}
                onFocus={onFocus}
                onBlur={onBlur}
                style={[styles.input, props.style]}
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
    input: {
        flex: 1,
        borderTopRightRadius: 0,
    },
})
