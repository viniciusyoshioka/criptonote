import { AnimatedHeader, AnimatedHeaderRef, HeaderButton, HeaderTitle } from "@elementium/native"
import { ForwardedRef, forwardRef } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { HomeMenu } from "./Menu"


export interface HomeHeaderProps {
    isSelectionMode: boolean;
    selectedNotesAmount: number;
    exitSelectionMode: () => void;
    invertSelection: () => void;
    deleteSelectedNotes: () => void;
    createNote: () => void;
    importNotes: () => void;
    exportNotes: () => void;
    openSettings: () => void;
}


export const HomeHeader = forwardRef((props: HomeHeaderProps, ref: ForwardedRef<AnimatedHeaderRef>) => {


    const safeAreaInsets = useSafeAreaInsets()


    function getTitle(): string {
        if (props.isSelectionMode) {
            return props.selectedNotesAmount.toString()
        }
        return translate("Home_header_title")
    }


    return (
        <AnimatedHeader ref={ref} overrideStatusBar={safeAreaInsets.top !== 0}>
            {props.isSelectionMode && (
                <HeaderButton
                    iconName={"close"}
                    onPress={props.exitSelectionMode}
                />
            )}

            <HeaderTitle title={getTitle()} />

            {!props.isSelectionMode && (
                <HeaderButton
                    iconName={"add"}
                    onPress={props.createNote}
                />
            )}

            {props.isSelectionMode && <>
                <HeaderButton
                    iconName={"swap-horiz"}
                    onPress={props.invertSelection}
                />

                <HeaderButton
                    iconName={"delete"}
                    onPress={props.deleteSelectedNotes}
                />
            </>}

            <HomeMenu
                isSelectionMode={props.isSelectionMode}
                importNotes={props.importNotes}
                exportNotes={props.exportNotes}
                openSettings={props.openSettings}
            />
        </AnimatedHeader>
    )
})
