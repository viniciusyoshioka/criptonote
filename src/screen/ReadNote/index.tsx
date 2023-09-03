import { AnimatedHeaderRef, Screen, ScrollScreen, Text } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Realm } from "@realm/react"
import { useRef } from "react"

import { LoadingModal } from "@components"
import { DecryptedNote, NoteContentSchema, useNoteRealm } from "@database"
import { useBackHandler, useHeaderColorOnScroll } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps, RouteParamProps } from "@router"
import { useAppTheme } from "@theme"
import { ReadNoteHeader } from "./Header"
import { useDecryptNote } from "./useDecryptNote"


export function ReadNote() {


    const navigation = useNavigation<NavigationParamProps<"ReadNote">>()
    const { params } = useRoute<RouteParamProps<"ReadNote">>()

    const { color } = useAppTheme()

    const readNoteHeaderRef = useRef<AnimatedHeaderRef>(null)

    const noteRealm = useNoteRealm()
    const noteContentId = Realm.BSON.ObjectId.createFromHexString(params.note.textId)
    const encryptedText = noteRealm.objectForPrimaryKey(NoteContentSchema, noteContentId) as NoteContentSchema
    const decryptedText = useDecryptNote(encryptedText.text, params.password)


    useBackHandler(() => {
        goBack()
        return true
    })


    const onScroll = useHeaderColorOnScroll({
        onInterpolate: color => readNoteHeaderRef.current?.setBackgroundColor(color),
    })


    function goBack() {
        navigation.goBack()
    }

    function editNote() {
        if (!decryptedText.decryptedNote) return

        const decryptedNote: DecryptedNote = {
            ...params.note,
            text: decryptedText.decryptedNote,
        }

        navigation.replace("EditNote", {
            note: decryptedNote,
            password: params.password,
        })
    }


    return (
        <Screen>
            <ReadNoteHeader
                ref={readNoteHeaderRef}
                goBack={goBack}
                noteTitle={params.note.title}
                editNote={editNote}
            />

            <ScrollScreen
                onScroll={onScroll}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            >
                <Text
                    variant={"title"}
                    size={"medium"}
                    children={decryptedText.decryptedNote}
                    selectable={true}
                    selectionColor={color.primaryContainer}
                    style={{ color: color.onBackground }}
                />
            </ScrollScreen>

            <LoadingModal
                visible={decryptedText.isLoading}
                message={translate("ReadNote_decryptingNote")}
            />
        </Screen>
    )
}
