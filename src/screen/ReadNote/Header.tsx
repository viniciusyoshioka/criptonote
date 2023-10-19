import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"


export interface ReadNoteHeaderProps {
    goBack: () => void
    editNote: () => void
    noteTitle: string
}


export function ReadNoteHeader(props: ReadNoteHeaderProps) {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={props.goBack} />

            <Appbar.Content title={props.noteTitle} />

            <Appbar.Action icon={"pencil-outline"} onPress={props.editNote} />
        </Appbar.Header>
    )
}
