import { forwardRef } from "react"
import { TextInput, TextInputProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"


export interface FullInputProps extends TextInputProps {}


export const FullInput = forwardRef<TextInput, FullInputProps>((props, ref) => {


    const { styles, theme } = useStyles(stylesheet)
    const { colors } = theme


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
            style={[styles.fullInput, props.style]}
        />
    )
})


const stylesheet = createStyleSheet(theme => ({
    fullInput: {
        flex: 1,
        paddingTop: 0,
        paddingBottom: 16,
        paddingHorizontal: 16,
        color: theme.colors.onSurface,
        ...theme.typography.body.large,
    },
}))
