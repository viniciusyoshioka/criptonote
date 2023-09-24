import { StyleSheet, ViewProps } from "react-native"
import Reanimated, { AnimatedProps, useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated"


export interface AnimatedAvoidKeyboardProps extends AnimatedProps<ViewProps> {}


export function AnimatedAvoidKeyboard(props: AnimatedAvoidKeyboardProps) {


    const flattenStyle = StyleSheet.flatten(props.style)


    const animatedKeyboard = useAnimatedKeyboard({
        isStatusBarTranslucentAndroid: true,
    })


    const avoidKeyboardStyle = useAnimatedStyle(() => ({
        ...flattenStyle as object,
        flex: 1,
        marginBottom: animatedKeyboard.height.value,
    }))


    return (
        <Reanimated.View
            {...props}
            style={avoidKeyboardStyle}
        />
    )
}
