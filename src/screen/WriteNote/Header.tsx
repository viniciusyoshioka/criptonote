import { useRef } from "react"
import { TextInput } from "react-native"
import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { HeaderInput } from "@components"
import { useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"


export interface WriteNoteHeaderProps {
    goBack: () => void
    title: string
    onChangeTitle: (text: string) => void
    onSubmitTitle: () => void
    saveNote: () => void
}


export function WriteNoteHeader(props: WriteNoteHeaderProps) {


    const titleInputRef = useRef<TextInput>(null)

    const safeAreaInsets = useSafeAreaInsets()


    useBlurInputOnKeyboardDismiss([titleInputRef])


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={props.goBack} />

            <HeaderInput
                ref={titleInputRef}
                value={props.title}
                onChangeText={props.onChangeTitle}
                placeholder={translate("WriteNote_titlePlaceholder")}
                onSubmitEditing={props.onSubmitTitle}
                autoCapitalize={"sentences"}
                autoFocus={true}
                returnKeyType={"next"}
            />

            <Appbar.Action icon={"content-save-outline"} onPress={props.saveNote} />
        </Appbar.Header>
    )
}
