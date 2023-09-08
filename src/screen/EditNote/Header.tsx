import { AnimatedHeader, AnimatedHeaderRef, HeaderButton, HeaderTitle } from "@elementium/native"
import { ForwardedRef, forwardRef } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { EditNoteMenu } from "./Menu"


export interface EditNoteHeaderProps {
    goBack: () => void;
    saveNote: () => void;
    changePassword: () => void;
    deleteNote: () => void;
}


export const EditNoteHeader = forwardRef((props: EditNoteHeaderProps, ref: ForwardedRef<AnimatedHeaderRef>) => {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <AnimatedHeader ref={ref} overrideStatusBar={safeAreaInsets.top !== 0}>
            <HeaderButton
                iconName={"arrow-back"}
                onPress={props.goBack}
            />

            <HeaderTitle title={translate("EditNote_header_title")} />

            <HeaderButton
                iconName={"content-save-outline"}
                iconGroup={"material-community"}
                onPress={props.saveNote}
            />

            <EditNoteMenu
                changePassword={props.changePassword}
                deleteNote={props.deleteNote}
            />
        </AnimatedHeader>
    )
})
