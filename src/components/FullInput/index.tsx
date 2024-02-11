import { forwardRef, useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"


export interface FullInputProps extends TextInputProps {}


export const FullInput = forwardRef<TextInput, FullInputProps>((props, ref) => {


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
            multiline={true}
            textAlignVertical={"top"}
            placeholderTextColor={colors.onSurfaceVariant}
            selectionColor={colors.primaryContainer}
            cursorColor={colors.primary}
            {...props}
            onBlur={onBlur}
            onFocus={onFocus}
            style={[
                styles.fullInput(isFocused),
                props.style,
            ]}
        />
    )
})


const stylesheet = createStyleSheet(theme => ({
    fullInput: (isFocused: boolean) => ({
        flex: 1,
        padding: 16,

        ...theme.typography.body.large,

        backgroundColor: theme.colors.surfaceContainerHighest,
        color: theme.colors.onSurface,

        borderRadius: theme.shape.extraSmall,
        borderWidth: isFocused ? 2 : 0,
        borderColor: theme.colors.primary,
    }),
}))
