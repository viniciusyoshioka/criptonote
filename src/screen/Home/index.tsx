import { AnimatedHeaderRef, Divider, Screen } from "@elementium/native"
import { useNavigation } from "@react-navigation/core"
import { Realm } from "@realm/react"
import { FlashList } from "@shopify/flash-list"
import { useEffect, useRef, useState } from "react"
import { Alert, View } from "react-native"

import { EmptyList, LoadingModal } from "@components"
import { NoteContentSchema, NoteSchema, SerializableNote, useNoteRealm } from "@database"
import { useBackHandler, useHeaderColorOnScroll, useSelectionMode } from "@hooks"
import { TranslationKeyType, translate } from "@locales"
import { NavigationParamProps } from "@router"
import { Constants } from "@services/constant"
import { log, stringifyError } from "@services/log"
import { getNotificationPermission } from "@services/permission"
import { HomeHeader } from "./Header"
import { NOTE_ITEM_HEIGHT, NoteItem } from "./NoteItem"
import { useNotes } from "./useNotes"


export { Code } from "./Code"


// TODO improve database operations in deleteSelectedNote
// TODO improve database operations in importNotes
// TODO improve database operations in exportSelectedNotes
// TODO fix FlashList alert when all notes are deleted
export function Home() {


    const navigation = useNavigation<NavigationParamProps<"Home">>()

    const homeHeaderRef = useRef<AnimatedHeaderRef>(null)

    const noteRealm = useNoteRealm()
    const notes = useNotes()
    const noteSelection = useSelectionMode<string>()
    const [showNoteDeletionModal, setShowNoteDeletionModal] = useState(false)


    useBackHandler(() => {
        if (noteSelection.isSelectionMode) {
            noteSelection.exitSelection()
            return true
        }
        return false
    })


    const onScroll = useHeaderColorOnScroll({
        onInterpolate: color => homeHeaderRef.current?.setBackgroundColor(color),
    })


    function invertSelection() {
        noteSelection.setSelectedData(current => notes
            .filter(noteItem => !current.includes(noteItem.id.toHexString()))
            .map(noteItem => noteItem.id.toHexString())
        )
    }

    async function deleteSelectedNotes() {
        setShowNoteDeletionModal(true)

        try {
            const noteIdToDelete = noteSelection
                .selectedData
                .map(Realm.BSON.ObjectId.createFromHexString)
            const notesToDelete = noteRealm
                .objects(NoteSchema)
                .filtered("id IN $0", noteIdToDelete)

            const noteContentIdToDelete = notesToDelete.map(item => item.textId)
            const noteContentToDelete = noteRealm
                .objects(NoteContentSchema)
                .filtered("id IN $0", noteContentIdToDelete)

            noteRealm.beginTransaction()
            noteRealm.delete(notesToDelete)
            noteRealm.delete(noteContentToDelete)
            noteRealm.commitTransaction()
        } catch (error) {
            if (noteRealm.isInTransaction) {
                noteRealm.cancelTransaction()
            }

            log.error(`Error deleting selected notes from database: "${stringifyError(error)}"`)
            Alert.alert(
                translate("warn"),
                translate("Home_alert_errorDeletingSelectedNotes_text")
            )
        } finally {
            noteSelection.exitSelection()
            setShowNoteDeletionModal(false)
        }
    }

    function alertDeleteNotes() {
        Alert.alert(
            translate("Home_alert_deleteNotes_title"),
            translate("Home_alert_deleteNotes_text"),
            [
                { text: translate("cancel") },
                { text: translate("delete"), onPress: deleteSelectedNotes },
            ]
        )
    }

    // TODO implement importNotes
    async function importNotes() {}

    // TODO implement exportSelectedNotes
    async function exportSelectedNotes() {}

    function alertExportNotes() {
        if (notes.length === 0) {
            Alert.alert(
                translate("warn"),
                translate("Home_alert_noNotesToExport_text")
            )
            return
        }

        const exportAlertText: TranslationKeyType = noteSelection.isSelectionMode
            ? "Home_alert_allSelectedNotesWillBeExported_text"
            : "Home_alert_allNotesWillBeExported_text"

        Alert.alert(
            translate("Home_alert_exportNotes_title"),
            translate(exportAlertText),
            [
                { text: translate("cancel") },
                { text: translate("Home_export"), onPress: exportSelectedNotes },
            ]
        )
    }

    function renderNoteItem({ item }: { item: NoteSchema }) {
        const noteId = item.id.toHexString()

        return (
            <NoteItem
                onClick={() => {
                    const serializableItem: SerializableNote = {
                        ...item,
                        id: noteId,
                        textId: item.textId.toHexString(),
                    }

                    navigation.navigate("Code", { note: serializableItem })
                }}
                onSelect={() => noteSelection.selectItem(noteId)}
                onDeselect={() => noteSelection.deselectItem(noteId)}
                isSelectionMode={noteSelection.isSelectionMode}
                isSelected={noteSelection.selectedData.includes(noteId)}
                note={item}
            />
        )
    }

    function noteKeyExtractor(item: NoteSchema) {
        return item.id.toHexString()
    }


    useEffect(() => {
        async function requestPermissions() {
            const hasPermission = await getNotificationPermission()
            if (!hasPermission) {
                Alert.alert(
                    translate("Home_alert_notificationPermissionDenied_title"),
                    translate("Home_alert_notificationPermissionDenied_text")
                )
            }
        }

        requestPermissions()
    }, [])


    return (
        <Screen>
            <HomeHeader
                ref={homeHeaderRef}
                isSelectionMode={noteSelection.isSelectionMode}
                selectedNotesAmount={noteSelection.selectedData.length}
                exitSelectionMode={noteSelection.exitSelection}
                invertSelection={invertSelection}
                deleteSelectedNotes={alertDeleteNotes}
                createNote={() => navigation.navigate("WriteNote")}
                importNotes={importNotes}
                exportNotes={alertExportNotes}
                openSettings={() => navigation.navigate("Settings")}
            />

            <View style={{ display: notes.length ? "flex" : "none", flex: 1 }}>
                <FlashList
                    data={notes.toJSON() as unknown as NoteSchema[]}
                    renderItem={renderNoteItem}
                    keyExtractor={noteKeyExtractor}
                    extraData={noteSelection.selectedData}
                    estimatedItemSize={NOTE_ITEM_HEIGHT}
                    ItemSeparatorComponent={() => <Divider wrapperStyle={{ paddingHorizontal: 16 }} />}
                    onScroll={onScroll}
                />
            </View>

            <EmptyList
                imageSource={Constants.appIconOutline}
                message={translate("Home_emptyNoteList")}
                visible={notes.length === 0}
            />

            <LoadingModal
                visible={showNoteDeletionModal}
                message={translate("Home_deletingNotes")}
            />
        </Screen>
    )
}
