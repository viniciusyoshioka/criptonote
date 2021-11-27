import React, { useEffect, useState } from "react"
import { Alert, BackHandler, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { EmptyList, NoteItem, SafeScreen } from "../../component"
import { appIconOutline } from "../../service/constant"
import { createAllFolder } from "../../service/folder-handler"
import { NoteForList } from "../../service/object-type"
import { HomeHeader } from "./Header"
import { NoteDatabase, useDatabase } from "../../database"


export function Home() {


    const navigation = useNavigation()

    const db = useDatabase()

    const [note, setNote] = useState<Array<NoteForList>>([])
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedNote, setSelectedNote] = useState<Array<number>>([])


    async function getNote() {
        const noteList = await NoteDatabase.getNoteList(db)
        setNote(noteList.notes)
    }

    function deleteSelectedNote() {
        async function alertDelete() {
            await NoteDatabase.deleteNote(db, selectedNote)
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

    function exportAppNote() {
        function alertExport() {
            NoteDatabase.exportNote(db, selectedNote)
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

    function addBackHandlerListener() {
        return BackHandler.addEventListener("hardwareBackPress", () => {
            if (selectionMode) {
                exitSelectionMode()
                return true
            }
            return false
        })
    }


    useEffect(() => {
        createAllFolder()
        getNote()
    }, [])

    useEffect(() => {
        const subscription = addBackHandlerListener()
        return () => subscription.remove()
    }, [addBackHandlerListener])


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
