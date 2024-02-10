import { ForwardedRef, forwardRef, useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from "react-native"
import { useStyles } from "react-native-unistyles"

import { stylesheet } from "./style"


export interface InputProps extends TextInputProps {
    isFocused?: boolean
}


export const Input = forwardRef((props: InputProps, ref: ForwardedRef<TextInput>) => {


    const { styles, theme } = useStyles(stylesheet)
    const { colors } = theme

    const [isFocused, setIsFocused] = useState(false)


    function onBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        if (props.isFocused === undefined) setIsFocused(false)
        if (props.onBlur) props.onBlur(event)
    }

    function onFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        if (props.isFocused === undefined) setIsFocused(true)
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
            style={[
                styles.input(props.isFocused !== undefined ? props.isFocused : isFocused),
                props.style,
            ]}
        />
    )
})
