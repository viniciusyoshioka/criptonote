import { createStyleSheet } from "react-native-unistyles"


export const stylesheet = createStyleSheet(theme => ({
    input: (isFocused: boolean) => ({
        height: 48,
        paddingVertical: 8,
        paddingHorizontal: 16,

        fontSize: theme.typography.body.large.fontSize,
        fontWeight: theme.typography.body.large.fontWeight,
        lineHeight: theme.typography.body.large.lineHeight,
        letterSpacing: theme.typography.body.large.letterSpacing,

        borderTopLeftRadius: theme.shape.extraSmall,
        borderTopRightRadius: theme.shape.extraSmall,
        borderBottomWidth: isFocused ? 2 : 0,
        borderColor: theme.colors.primary,

        backgroundColor: theme.colors.surfaceContainerHighest,
        color: theme.colors.onSurface,
    }),
}))
