import { MarkdownTextInput, MarkdownTextInputProps } from "@expensify/react-native-live-markdown"
import { forwardRef, useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"


export interface FullMarkdownInputProps extends TextInputProps {}


export const FullMarkdownInput = forwardRef<TextInput, FullMarkdownInputProps>((props, ref) => {


    const { styles, theme } = useStyles(stylesheet)
    const { colors, typography } = theme

    const [isFocused, setIsFocused] = useState(false)


    function onBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(false)
        if (props.onBlur) props.onBlur(event)
    }

    function onFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(true)
        if (props.onFocus) props.onFocus(event)
    }


    const markdownStyle: MarkdownTextInputProps["markdownStyle"] = {
        syntax: {
            color: colors.onSurfaceVariant,
        },
        link: {
            color: colors.primary,
        },
        h1: {
            fontSize: typography.headline.small.fontSize,
        },
        blockquote: {
            borderColor: colors.onSurfaceVariant,
            borderWidth: 4,
        },
        code: {
            fontFamily: "monospace",
            backgroundColor: colors.onSurfaceVariant,
            color: colors.surfaceContainer,
        },
        pre: {
            fontFamily: "monospace",
            backgroundColor: colors.onSurfaceVariant,
            color: colors.surfaceContainer,
        },
        mentionHere: {
            backgroundColor: colors.inversePrimary,
            color: colors.onPrimaryContainer,
        },
        mentionUser: {
            backgroundColor: colors.tertiaryContainer,
            color: colors.onTertiaryContainer,
        },
    }


    return (
        <MarkdownTextInput
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
            style={[styles.fullInput(isFocused), props.style]}
            markdownStyle={markdownStyle}
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
