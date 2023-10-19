import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"


export interface WriteNoteHeaderProps {
    goBack: () => void
    saveNote: () => void
}


export function WriteNoteHeader(props: WriteNoteHeaderProps) {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={props.goBack} />

            <Appbar.Content title={translate("WriteNote_header_title")} />

            <Appbar.Action icon={"content-save-outline"} onPress={props.saveNote} />
        </Appbar.Header>
    )
}
