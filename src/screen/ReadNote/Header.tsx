import { AnimatedHeader, AnimatedHeaderRef, HeaderButton, HeaderTitle } from "@elementium/native"
import { ForwardedRef, forwardRef } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"


export interface ReadNoteHeaderProps {
    goBack: () => void;
    editNote: () => void;
    noteTitle: string;
}


export const ReadNoteHeader = forwardRef((props: ReadNoteHeaderProps, ref: ForwardedRef<AnimatedHeaderRef>) => {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <AnimatedHeader ref={ref} overrideStatusBar={safeAreaInsets.top !== 0}>
            <HeaderButton
                iconName={"arrow-back"}
                onPress={props.goBack}
            />

            <HeaderTitle title={props.noteTitle} />

            <HeaderButton
                iconName={"pencil-outline"}
                iconGroup={"material-community"}
                onPress={props.editNote}
            />
        </AnimatedHeader>
    )
})
