import React, { useEffect, useState } from "react"
import { Alert, BackHandler, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { EmptyList, NoteItem, SafeScreen } from "../../component"
import { appIconOutline } from "../../service/constant"
import { createAllFolder } from "../../service/folder-handler"
import { useBackHandler } from "../../service/hook"
import { deleteNote, exportNote } from "../../service/note-handler"
import { NoteForList } from "../../service/object-type"
import { HomeHeader } from "./Header"
import { NoteDatabase, openDatabase } from "../../database"
import { SQLiteDatabase } from "react-native-sqlite-storage"


export function Home() {


    const navigation = useNavigation()

    const [db, setDb] = useState<SQLiteDatabase | null>(null)

    const [note, setNote] = useState<Array<NoteForList>>([])
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedNote, setSelectedNote] = useState<Array<number>>([])


    if (navigation.isFocused()) {
        useBackHandler(() => {
            if (selectionMode) {
                exitSelectionMode()
            } else {
                BackHandler.exitApp()
            }
            return true
        })
    }


    async function getNote() {
        if (db) {
            await NoteDatabase.createNoteTable(db)

            const noteList = await NoteDatabase.getNoteList(db)
            setNote(noteList.notes)
        }
    }

    // TODO
    function deleteSelectedNote() {
        async function alertDelete() {
            await deleteNote(selectedNote)
            await getNote()
            exitSelectionMode()
        }

        Alert.alert(
            "Apagar",
            "Estas notas serão apagadas permanentemente",
            [
                { text: "Cancelar", onPress: () => { } },
                { text: "Apagar", onPress: async () => await alertDelete() }
            ]
        )
    }

    // TODO
    function exportAppNote() {
        function alertExport() {
            exportNote(selectedNote, selectionMode)
            exitSelectionMode()
        }

        Alert.alert(
            "Exportar",
            `As notas ${selectionMode ? "selecionadas " : ""}serão exportadas`,
            [
                { text: "Cancelar", onPress: () => { } },
                { text: "Exportar", onPress: () => alertExport() }
            ]
        )
    }

    function selectNote(noteId: number) {
        if (!selectionMode) {
            setSelectionMode(true)
        }
        if (!selectedNote.includes(noteId)) {
            selectedNote.push(noteId)
        }
    }

    function deselectNote(noteId: number) {
        const index = selectedNote.indexOf(noteId)
        if (index !== -1) {
            selectedNote.splice(index, 1)
        }
        if (selectionMode && selectedNote.length === 0) {
            setSelectionMode(false)
        }
    }

    function renderNoteItem({ item }: { item: NoteForList }) {
        return (
            <NoteItem
                click={() => navigation.navigate("Code", { noteId: item.id })}
                select={() => selectNote(item.id)}
                deselect={() => deselectNote(item.id)}
                selectionMode={selectionMode}
                noteForList={item}
            />
        )
    }

    function exitSelectionMode() {
        setSelectedNote([])
        setSelectionMode(false)
    }


    useEffect(() => {
        createAllFolder()
    }, [])

    useEffect(() => {
        openDatabase()
            .then((database) => {
                setDb(database)
            })
            .catch((error) => {
                // TODO log
            })
    }, [])

    useEffect(() => {
        getNote()

        if (!__DEV__ && db) {
            return () => {
                db.close()
            }
        }
    }, [db])


    return (
        <SafeScreen>
            <HomeHeader
                selectionMode={selectionMode}
                exitSelectionMode={exitSelectionMode}
                deleteNote={deleteSelectedNote}
                addNote={() => navigation.navigate("Add")}
                importNote={() => navigation.navigate("FileExplorer", { action: "import" })}
                exportNote={exportAppNote}
                encryptFile={() => navigation.navigate("FileExplorer", { action: "encrypt" })}
                openSettings={() => navigation.navigate("Settings")}
            />

            <FlatList
                data={note}
                renderItem={renderNoteItem}
                keyExtractor={(item) => item.id.toString()}
                extraData={[selectNote, deselectNote]}
                style={{ marginLeft: 6, marginTop: 6 }}
            />

            {(note.length === 0) && (
                <EmptyList source={appIconOutline} message={"Nenhuma nota"} />
            )}
        </SafeScreen>
    )
}
