import { Screen } from "@elementium/native"
import { useNavigation } from "@react-navigation/core"
import { Realm } from "@realm/react"
import { FlashList } from "@shopify/flash-list"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import DocumentPicker from "react-native-document-picker"
import RNFS from "react-native-fs"
import { Divider, FAB } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { EmptyList, LoadingModal } from "@components"
import { NoteContentSchema, NoteSchema, SerializableNote, openExportedDatabase, useNoteRealm } from "@database"
import { useBackHandler, useSelectionMode } from "@hooks"
import { TranslationKeyType, translate } from "@locales"
import { NavigationParamProps } from "@router"
import { Constants } from "@services/constant"
import { DateService } from "@services/date"
import { createAllFolders } from "@services/folder-handler"
import { log, stringifyError } from "@services/log"
import { ExternalStorage } from "@services/manage-external-storage"
import { getNotificationPermission } from "@services/permission"
import { useSettings } from "@services/settings"
import { HomeHeader } from "./Header"
import { NOTE_ITEM_HEIGHT, NoteItem } from "./NoteItem"
import { useNotes } from "./useNotes"


export { Code } from "./Code"


type PickedFile = {
    name: string
    path: string
}


// TODO add export and share notes
// TODO use app file explorer to import notes
// TODO improve database operations in deleteSelectedNote
// TODO improve database operations in importNotes
// TODO improve database operations in exportSelectedNotes
export function Home() {


    const safeAreaInsets = useSafeAreaInsets()
    const navigation = useNavigation<NavigationParamProps<"Home">>()

    const { settings } = useSettings()
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

    async function openFileExplorer() {
        if (settings.fileExplorer === "app") {
            const hasPermission = await ExternalStorage.isManageExternalStorageAllowed()
            if (!hasPermission) {
                await ExternalStorage.requestManageExternalStorage()
                return
            }

            navigation.navigate("FileExplorer", { redirect: "FileCode" })
            return
        }

        const file = await selectFile()
        if (!file) return

        navigation.navigate("FileCode", {
            filePath: file.path,
        })
    }

    async function selectFile(): Promise<PickedFile | null> {
        try {
            const response = await DocumentPicker.pickSingle({
                copyTo: "cachesDirectory",
            })

            if (response.copyError)
                throw new Error(`Error copying file to cache directory: ${response.copyError}`)
            if (!response.fileCopyUri)
                throw new Error("File copy uri is not defined")
            if (!response.name)
                throw new Error("File name is not defined")

            const fileCopyUri = response.fileCopyUri.replaceAll("%20", " ").replace("file://", "")

            return {
                name: response.name,
                path: fileCopyUri,
            }
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                return null
            }

            log.error(`Error selecting files ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate("Home_alert_errorSelectingFile_text")
            )
        }

        return null
    }

    async function importNotes() {
        try {
            const pickedFile = await DocumentPicker.pickSingle({
                copyTo: "cachesDirectory",
                type: DocumentPicker.types.allFiles,
            })

            if (pickedFile.copyError)
                throw new Error(`Error copying picked file to import notes: "${stringifyError(pickedFile.copyError)}"`)
            if (!pickedFile.fileCopyUri)
                throw new Error("Copying notes to import did not returned a valid path")

            Alert.alert(
                translate("Home_alert_importNotes_title"),
                translate("Home_alert_importNotes_text")
            )
            await createAllFolders()

            const fileUri = pickedFile.fileCopyUri.replaceAll("%20", " ").replace("file://", "")
            await RNFS.moveFile(fileUri, Constants.importDatabaseFullPath)

            const exportedDatabase = await openExportedDatabase(Constants.importDatabaseFullPath)
            const exportedNotes = exportedDatabase.objects(NoteSchema).sorted("modifiedAt")

            noteRealm.beginTransaction()
            for (let i = 0; i < exportedNotes.length; i++) {
                const exportedNote = exportedNotes[i]
                const exportedNoteContent = exportedDatabase
                    .objectForPrimaryKey(NoteContentSchema, exportedNote.textId) as NoteContentSchema

                const importedNoteContent = noteRealm.create(NoteContentSchema, {
                    text: exportedNoteContent.text,
                })
                noteRealm.create(NoteSchema, {
                    createdAt: exportedNote.createdAt,
                    modifiedAt: Date.now(),
                    title: exportedNote.title,
                    textId: importedNoteContent.id,
                })
            }
            noteRealm.commitTransaction()

            exportedDatabase.close()
            await RNFS.unlink(Constants.importDatabaseFullPath)

            Alert.alert(
                translate("success"),
                translate("Home_alert_notesImported_text")
            )
        } catch (error) {
            if (DocumentPicker.isCancel(error)) return

            if (noteRealm.isInTransaction) {
                noteRealm.cancelTransaction()
            }

            try {
                if (await RNFS.exists(Constants.fullPathTemporaryImported)) {
                    await RNFS.unlink(Constants.fullPathTemporaryImported)
                }
            } catch (error) {
                log.error(`Error deleting temporary imported files after error in note import: "${stringifyError(error)}"`)
            }

            log.error(`Error importing notes: "${stringifyError(error)}"`)
            Alert.alert(
                translate("warn"),
                translate("Home_alert_errorImportingNotes_text")
            )
        }
    }

    async function exportSelectedNotes() {
        Alert.alert(
            translate("Home_alert_exportingNotes_title"),
            translate("Home_alert_exportingNotes_text")
        )

        await createAllFolders()
        try {
            const exportedDatabase = await openExportedDatabase(Constants.exportDatabaseFullPath)

            const selectedNotesObjectId = noteSelection
                .selectedData
                .map(Realm.BSON.ObjectId.createFromHexString)
            const notesToExport = noteSelection.isSelectionMode
                ? notes.filtered("id IN $0", selectedNotesObjectId)
                : notes

            exportedDatabase.write(() => {
                notesToExport.forEach(noteToExport => {
                    const noteContentToExport = noteRealm
                        .objectForPrimaryKey(NoteContentSchema, noteToExport.textId) as NoteContentSchema

                    const exportedNoteContent = exportedDatabase.create(NoteContentSchema, {
                        text: noteContentToExport.text,
                    })

                    exportedDatabase.create(NoteSchema, {
                        createdAt: noteToExport.createdAt,
                        modifiedAt: noteToExport.modifiedAt,
                        title: noteToExport.title,
                        textId: exportedNoteContent.id,
                    })
                })
            })

            exportedDatabase.close()

            const date = DateService.getDate().replaceAll("-", "")
            const time = DateService.getTime().replaceAll("-", "")
            const exportedNotesFileName = `${Constants.appName}_${date}_${time}.${Constants.exportedNotesExtension}`
            const exportedNotesFullFilePath = `${Constants.fullPathExported}/${exportedNotesFileName}`

            await RNFS.moveFile(Constants.exportDatabaseFullPath, exportedNotesFullFilePath)

            const notesExportationResponseText: TranslationKeyType = noteSelection.isSelectionMode
                ? "Home_alert_selectedNotesExported_text"
                : "Home_alert_allNotesExported_text"

            Alert.alert(
                translate("success"),
                translate(notesExportationResponseText)
            )
        } catch (error) {
            log.error(`Error exporting notes: ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate("Home_alert_errorExportingNotes_text")
            )
        }

        if (noteSelection.isSelectionMode) {
            noteSelection.exitSelection()
        }
    }

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
                isSelectionMode={noteSelection.isSelectionMode}
                selectedNotesAmount={noteSelection.selectedData.length}
                exitSelectionMode={noteSelection.exitSelection}
                invertSelection={invertSelection}
                deleteSelectedNotes={alertDeleteNotes}
                importNotes={importNotes}
                exportNotes={alertExportNotes}
                openFiles={openFileExplorer}
            />

            {notes.length > 0 && (
                <FlashList
                    data={notes.toJSON() as unknown as NoteSchema[]}
                    renderItem={renderNoteItem}
                    keyExtractor={noteKeyExtractor}
                    extraData={noteSelection.selectedData}
                    estimatedItemSize={NOTE_ITEM_HEIGHT}
                    ItemSeparatorComponent={() => <Divider style={{ marginHorizontal: 16 }} />}
                    contentContainerStyle={{ paddingBottom: (16 * 2) + 56 + safeAreaInsets.bottom }}
                />
            )}

            <FAB
                icon={"plus"}
                mode={"flat"}
                style={{ position: "absolute", right: safeAreaInsets.right, bottom: safeAreaInsets.bottom, margin: 16 }}
                onPress={() => navigation.navigate("WriteNote")}
            />

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
