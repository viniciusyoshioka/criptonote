import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { EditNoteMenu } from "./Menu"


export interface EditNoteHeaderProps {
    goBack: () => void
    saveNote: () => void
    changePassword: () => void
    deleteNote: () => void
}


export function EditNoteHeader(props: EditNoteHeaderProps) {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={props.goBack} />

            <Appbar.Content title={translate("EditNote_header_title")} />

            <Appbar.Action icon={"content-save-outline"} onPress={props.saveNote} />

            <EditNoteMenu
                changePassword={props.changePassword}
                deleteNote={props.deleteNote}
            />
        </Appbar.Header>
    )
}
