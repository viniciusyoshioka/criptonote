import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { interpolateColor, runOnJS, useAnimatedReaction, useSharedValue } from "react-native-reanimated"

import { useAppTheme } from "@theme"


export type HeaderColorOnScrollOptions = {
    inputRange?: number[]
    outputRange?: string[]
    onInterpolate?: (color: string) => void
}


export function useHeaderColorOnScroll(options?: HeaderColorOnScrollOptions) {


    const { appTheme, color, isDark } = useAppTheme()
    const scrollY = useSharedValue(0)


    const inputRange = options?.inputRange ?? [0, 56]
    const outputRange = options?.outputRange ?? [color.surface, color.surfaceContainer]


    function updateHeaderColor(scrollY: number) {
        const headerColor = interpolateColor(scrollY, inputRange, outputRange)
        if (options?.onInterpolate) options.onInterpolate(headerColor)
    }

    function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        scrollY.value = event.nativeEvent.contentOffset.y
    }


    useAnimatedReaction(
        () => scrollY.value,
        current => runOnJS(updateHeaderColor)(current),
        [scrollY.value, appTheme, isDark]
    )


    return onScroll
}
