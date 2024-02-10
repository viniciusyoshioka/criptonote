import { forwardRef } from "react"
import { TextInput, TextInputProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"


export interface HeaderInputProps extends TextInputProps {}


export const HeaderInput = forwardRef<TextInput, HeaderInputProps>((props, ref) => {


    const { styles, theme } = useStyles(stylesheet)
    const { colors } = theme


    return (
        <TextInput
            ref={ref}
            blurOnSubmit={false}
            placeholderTextColor={colors.onSurfaceVariant}
            selectionColor={colors.primaryContainer}
            cursorColor={colors.primary}
            selectTextOnFocus={true}
            {...props}
            style={[styles.headerInput, props.style]}
        />
    )
})


const stylesheet = createStyleSheet(theme => ({
    headerInput: {
        flex: 1,
        color: theme.colors.onSurface,
        ...theme.typography.title.large,
        padding: 0,
    },
}))
