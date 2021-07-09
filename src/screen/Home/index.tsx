import { useNavigation } from "@react-navigation/core"
import React, { useCallback, useEffect, useState } from "react"
import { Alert, BackHandler, FlatList } from "react-native"

import { EmptyList, NoteItem, SafeScreen } from "../../component"
import { appIconOutline, appInDevelopment } from "../../service/constant"
import { createAllFolder } from "../../service/folder-handler"
import { useBackHandler } from "../../service/hook"
import { deleteNote, exportNote } from "../../service/note-handler"
import { debugHome, Note } from "../../service/object-type"
import { readDebugHome, readNote, readNoteId, writeDebugHome, writeNote, writeNoteId } from "../../service/storage"
import { DebugHome } from "./DebugHome"
import { HomeHeader } from "./Header"


export function Home() {


    const navigation = useNavigation()

    const [debugHome, setDebugHome] = useState<debugHome>("hide")
    const [note, setNote] = useState<Array<Note>>([])
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


    const debugSwitchDebugHome = useCallback(async () => {
        switch (debugHome) {
            case "show":
                setDebugHome("hide")
                await writeDebugHome("hide")
                break
            case "hide":
                setDebugHome("show")
                await writeDebugHome("show")
                break
            default:
                throw new Error("Unknown debugHome value")
        }
    }, [debugHome])

    const debugReadNote = useCallback(async () => {
        const noteList = await readNote()
        const noteId = await readNoteId()

        setNote(noteList)

        console.log(`note - READ - ${JSON.stringify(noteList)}`)
        console.log(`noteId - READ - ${JSON.stringify(noteId)}`)
    }, [])

    const debugWriteNote = useCallback(async () => {
        const tempNoteList: Array<Note> = [
            { id: 0, title: "Titulo 1", text: "Texto 1", lastModificationDate: "18:04 08/06/2021" },
            { id: 1, title: "Titulo 2", text: "Texto 2", lastModificationDate: "18:04 08/06/2021" },
            { id: 2, title: "Titulo 3", text: "Texto 3", lastModificationDate: "18:04 08/06/2021" },
            { id: 3, title: "Titulo 4", text: "Texto 4", lastModificationDate: "18:04 08/06/2021" },
            { id: 4, title: "Titulo 5", text: "Texto 5", lastModificationDate: "18:04 08/06/2021" },
        ]
        const tempNoteId: Array<number> = [0, 1, 2, 3, 4]

        await writeNote(tempNoteList)
        await writeNoteId(tempNoteId)

        setNote(tempNoteList)

        console.log("note, noteId - WRITE")
    }, [])

    const debugClearNote = useCallback(async () => {
        await writeNote([])
        await writeNoteId([])

        setNote([])

        console.log("note, noteId - CLEAR")
    }, [])


    const getNote = useCallback(async () => {
        const note = await readNote()
        setNote(note)
    }, [])

    const deleteSelectedNote = useCallback(() => {
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
    }, [selectedNote])

    const exportAppNote = useCallback(() => {
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
    }, [selectedNote, selectionMode])

    const selectNote = useCallback((noteId: number) => {
        if (!selectionMode) {
            setSelectionMode(true)
        }
        if (!selectedNote.includes(noteId)) {
            selectedNote.push(noteId)
        }
    }, [selectionMode, selectedNote])

    const deselectNote = useCallback((noteId: number) => {
        const index = selectedNote.indexOf(noteId)
        if (index !== -1) {
            selectedNote.splice(index, 1)
        }
        if (selectionMode && selectedNote.length === 0) {
            setSelectionMode(false)
        }
    }, [selectedNote, selectionMode])

    const renderNoteItem = useCallback(({ item }: { item: Note }) => {
        return (
            <NoteItem
                click={() => navigation.navigate("Code", { note: item })}
                select={() => selectNote(item.id)}
                deselect={() => deselectNote(item.id)}
                selectionMode={selectionMode}
                note={item}
            />
        )
    }, [selectionMode, selectNote, deselectNote])

    const exitSelectionMode = useCallback(() => {
        setSelectedNote([])
        setSelectionMode(false)
    }, [])


    useEffect(() => {
        if (appInDevelopment) {
            // eslint-disable-next-line no-inner-declarations
            async function debugGetDebugHome() {
                const getDebugHome = await readDebugHome()
                setDebugHome(getDebugHome)
            }

            debugGetDebugHome()
        }

        createAllFolder()
        getNote()
    }, [])


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
                switchDebugHome={debugSwitchDebugHome}
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

            {(debugHome === "show") && (
                <DebugHome
                    debugReadNote={debugReadNote}
                    debugWriteNote={debugWriteNote}
                    debugClearNote={debugClearNote}
                />
            )}
        </SafeScreen>
    )
}
