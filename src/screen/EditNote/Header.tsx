import { useRef } from "react"
import { TextInput } from "react-native"
import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { HeaderInput } from "@components"
import { useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"
import { EditNoteMenu } from "./Menu"


export interface EditNoteHeaderProps {
    goBack: () => void
    title: string
    onChangeTitle: (newTitle: string) => void
    onSubmitTitle: () => void
    saveNote: () => void
    changePassword: () => void
    deleteNote: () => void
}


export function EditNoteHeader(props: EditNoteHeaderProps) {


    const inputTitleRef = useRef<TextInput>(null)

    const safeAreaInsets = useSafeAreaInsets()


    useBlurInputOnKeyboardDismiss([inputTitleRef])


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={props.goBack} />

            <HeaderInput
                ref={inputTitleRef}
                value={props.title}
                onChangeText={props.onChangeTitle}
                placeholder={translate("EditNote_titlePlaceholder")}
                onSubmitEditing={props.onSubmitTitle}
                autoCapitalize={"sentences"}
                returnKeyType={"next"}
            />

            <Appbar.Action icon={"content-save-outline"} onPress={props.saveNote} />

            <EditNoteMenu
                changePassword={props.changePassword}
                deleteNote={props.deleteNote}
            />
        </Appbar.Header>
    )
}
