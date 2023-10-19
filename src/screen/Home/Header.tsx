import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { HomeMenu } from "./Menu"


export interface HomeHeaderProps {
    isSelectionMode: boolean
    selectedNotesAmount: number
    exitSelectionMode: () => void
    invertSelection: () => void
    deleteSelectedNotes: () => void
    importNotes: () => void
    exportNotes: () => void
    openFiles: () => void
}


export function HomeHeader(props: HomeHeaderProps) {


    const safeAreaInsets = useSafeAreaInsets()


    function getTitle(): string {
        if (props.isSelectionMode) {
            return props.selectedNotesAmount.toString()
        }
        return translate("Home_header_title")
    }


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            {props.isSelectionMode && (
                <Appbar.Action icon={"close"} onPress={props.exitSelectionMode} />
            )}

            <Appbar.Content title={getTitle()} />

            {props.isSelectionMode && <>
                <Appbar.Action icon={"swap-horizontal"} onPress={props.invertSelection} />

                <Appbar.Action icon={"trash-can-outline"} onPress={props.deleteSelectedNotes} />
            </>}

            {!props.isSelectionMode && <>
                <Appbar.Action icon={"note-text-outline"} onPress={props.openFiles} />
            </>}

            <HomeMenu
                isSelectionMode={props.isSelectionMode}
                importNotes={props.importNotes}
                exportNotes={props.exportNotes}
            />
        </Appbar.Header>
    )
}
