import { AnimatedHeader, AnimatedHeaderRef, HeaderButton, HeaderTitle } from "@elementium/native"
import { ForwardedRef, forwardRef } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"


export interface SettingsHeaderProps {
    goBack: () => void;
}


export const SettingsHeader = forwardRef((props: SettingsHeaderProps, ref: ForwardedRef<AnimatedHeaderRef>) => {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <AnimatedHeader ref={ref} overrideStatusBar={safeAreaInsets.top !== 0}>
            <HeaderButton
                iconName={"arrow-back"}
                onPress={props.goBack}
            />

            <HeaderTitle title={translate("Settings_header_title")} />
        </AnimatedHeader>
    )
})
