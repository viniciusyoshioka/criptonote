import { AnimatedHeader, AnimatedHeaderRef, HeaderButton, HeaderTitle } from "@elementium/native"
import { ForwardedRef, forwardRef } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"


export interface WriteNoteHeaderProps {
    goBack: () => void;
    saveNote: () => void;
}


export const WriteNoteHeader = forwardRef((props: WriteNoteHeaderProps, ref: ForwardedRef<AnimatedHeaderRef>) => {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <AnimatedHeader ref={ref} overrideStatusBar={safeAreaInsets.top !== 0}>
            <HeaderButton
                iconName={"arrow-back"}
                onPress={props.goBack}
            />

            <HeaderTitle title={translate("WriteNote_header_title")} />

            <HeaderButton
                iconName={"content-save-outline"}
                iconGroup={"material-community"}
                onPress={props.saveNote}
            />
        </AnimatedHeader>
    )
})
