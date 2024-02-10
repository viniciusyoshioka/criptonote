import { createStyleSheet } from "react-native-unistyles"


export const NOTE_ITEM_HEIGHT = 60


export const stylesheet = createStyleSheet(theme => ({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: NOTE_ITEM_HEIGHT,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: theme.colors.surface,
    },
    block: {
        flex: 1,
        justifyContent: "center",
    },
}))
