import { Icon, Pressable, PressableProps } from "@elementium/native"
import { StyleSheet, ViewStyle } from "react-native"

import { useAppTheme } from "@theme"


export interface ToggleVisibilityButtonProps extends PressableProps {
    hidePassword: boolean
    isFocused: boolean
}


export function ToggleVisibilityButton(props: ToggleVisibilityButtonProps) {


    const { color, shape } = useAppTheme()


    const buttonStyle: ViewStyle = {
        borderTopRightRadius: shape.extraSmall,
        backgroundColor: color.surfaceContainerHighest,
        borderBottomWidth: props.isFocused ? 2 : 0,
        borderBottomColor: color.primary,
    }


    return (
        <Pressable
            {...props}
            style={[styles.button, buttonStyle]}
        >
            <Icon
                name={props.hidePassword ? "eye-off-outline" : "eye-outline"}
                group={"material-community"}
                color={color.onSurfaceVariant}
            />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
    },
})
