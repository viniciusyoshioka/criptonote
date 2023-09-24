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
    importNotes: () => void;
    exportNotes: () => void;
    openFiles: () => void;
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

            {props.isSelectionMode && <>
                <HeaderButton
                    iconName={"swap-horiz"}
                    onPress={props.invertSelection}
                />

                <HeaderButton
                    iconName={"trash-can-outline"}
                    iconGroup={"material-community"}
                    onPress={props.deleteSelectedNotes}
                />
            </>}

            {!props.isSelectionMode && <>
                <HeaderButton
                    iconName={"feed"}
                    iconGroup={"material-outline"}
                    onPress={props.openFiles}
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
