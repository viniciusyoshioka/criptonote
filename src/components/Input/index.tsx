import { forwardRef, useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"


export interface InputProps extends TextInputProps {}


export const Input = forwardRef<TextInput, InputProps>((props, ref) => {


    const { styles, theme } = useStyles(stylesheet)
    const { colors } = theme

    const [isFocused, setIsFocused] = useState(false)


    function onBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(false)
        if (props.onBlur) props.onBlur(event)
    }

    function onFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(true)
        if (props.onFocus) props.onFocus(event)
    }


    return (
        <TextInput
            ref={ref}
            blurOnSubmit={false}
            placeholderTextColor={colors.onSurfaceVariant}
            selectionColor={colors.primaryContainer}
            cursorColor={colors.primary}
            {...props}
            onBlur={onBlur}
            onFocus={onFocus}
            style={[styles.input(isFocused), props.style]}
        />
    )
})


const stylesheet = createStyleSheet(theme => ({
    input: (isFocused: boolean) => ({
        height: 48,
        paddingVertical: 8,
        paddingHorizontal: 16,

        ...theme.typography.body.large,

        borderRadius: theme.shape.extraSmall,
        borderWidth: 2,
        borderColor: isFocused ? theme.colors.primary : theme.colors.surfaceContainerHighest,

        backgroundColor: theme.colors.surfaceContainerHighest,
        color: theme.colors.onSurface,
    }),
}))
