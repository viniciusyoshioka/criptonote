import React, { useEffect, useState } from "react"
import { Alert, BackHandler, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { EmptyList, NoteItem, SafeScreen } from "../../component"
import { appIconOutline } from "../../service/constant"
import { createAllFolder } from "../../service/folder-handler"
import { NoteForList } from "../../service/object-type"
import { HomeHeader } from "./Header"
import { NoteDatabase } from "../../database"
import { log } from "../../service/log"


export function Home() {


    const navigation = useNavigation()

    const [note, setNote] = useState<Array<NoteForList>>([])
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedNote, setSelectedNote] = useState<Array<number>>([])


    async function getNote() {
        try {
            const noteList = await NoteDatabase.getNoteList()
            setNote(noteList)
        } catch (error) {
            log.error(`Error getting note list from database: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro ao carregar notas"
            )
        }
    }

    function deleteSelectedNote() {
        async function alertDelete() {
            try {
                await NoteDatabase.deleteNote(selectedNote)
                await getNote()
                exitSelectionMode()
            } catch (error) {
                log.error(`Error deleting selected notes: "${error}"`)
                Alert.alert(
                    "Aviso",
                    "Erro apagando notas selecionadas"
                )
            }
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
            try {
                NoteDatabase.exportNote(selectedNote)
                exitSelectionMode()
            } catch (error) {
                log.error(`Error exporting notes: "${error}"`)
                Alert.alert(
                    "Aviso",
                    "Erro ao exportar notas"
                )
            }
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
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingTop: 8, paddingLeft: 8 }}
            />

            {(note.length === 0) && (
                <EmptyList source={appIconOutline} message={"Nenhuma nota"} />
            )}
        </SafeScreen>
    )
}
