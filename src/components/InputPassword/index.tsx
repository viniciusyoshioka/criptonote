import { Icon } from "@elementium/native"
import { forwardRef, useState } from "react"
import { NativeSyntheticEvent, Pressable, StyleProp, TextInput, TextInputFocusEventData, TextInputProps, View, ViewStyle } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"

import { translate } from "@locales"


export interface InputPasswordProps extends TextInputProps {
    wrapperStyle?: StyleProp<ViewStyle>
}


export const InputPassword = forwardRef<TextInput, InputPasswordProps>((props, ref) => {


    const { styles, theme } = useStyles(stylesheet)
    const { colors } = theme

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
            <TextInput
                autoCapitalize={"none"}
                autoComplete={"new-password"}
                autoCorrect={false}
                placeholder={translate("password")}
                secureTextEntry={isPasswordHidden}
                keyboardType={isPasswordHidden ? "default" : "visible-password"}
                blurOnSubmit={false}
                placeholderTextColor={colors.onSurfaceVariant}
                selectionColor={colors.primaryContainer}
                cursorColor={colors.primary}
                ref={ref}
                {...props}
                onBlur={onBlur}
                onFocus={onFocus}
                style={[styles.input(isFocused), props.style]}
            />

            <Pressable onPress={togglePasswordVisibility} style={styles.toggleButton(isFocused)}>
                <Icon
                    name={isPasswordHidden ? "eye-off-outline" : "eye-outline"}
                    group={"material-community"}
                    color={colors.onSurfaceVariant}
                />
            </Pressable>
        </View>
    )
})


const stylesheet = createStyleSheet(theme => ({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: (isFocused: boolean) => ({
        flex: 1,
        height: 48,
        paddingVertical: 8,
        paddingHorizontal: 16,

        ...theme.typography.body.large,

        backgroundColor: theme.colors.surfaceContainerHighest,
        color: theme.colors.onSurface,
        borderTopLeftRadius: theme.shape.extraSmall,
        borderBottomLeftRadius: theme.shape.extraSmall,
        borderWidth: 2,
        borderRightWidth: 0,
        borderColor: isFocused ? theme.colors.primary : theme.colors.surfaceContainerHighest,
    }),
    toggleButton: (isFocused: boolean) => ({
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        backgroundColor: theme.colors.surfaceContainerHighest,
        borderTopRightRadius: theme.shape.extraSmall,
        borderBottomRightRadius: theme.shape.extraSmall,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderColor: isFocused ? theme.colors.primary : theme.colors.surfaceContainerHighest,
    }),
}))
