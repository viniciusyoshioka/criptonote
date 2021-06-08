import React, { useCallback, useEffect, useState } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { SafeScreen } from "../../component/Screen"
import { appIconOutline, appInDevelopment } from "../../service/constant"
import { DebugHome } from "./DebugHome"
import { HomeHeader } from "./Header"
import { EmptyListImage, EmptyListText, EmptyListView } from "../../component/EmptyList"
import { debugHome, Note } from "../../service/object-type"
import { readDebugHome, readNote, readNoteId, writeDebugHome, writeNote, writeNoteId } from "../../service/storage"
import { createAllFolder } from "../../service/folder-handler"
import { NoteItem } from "../../component/NoteItem"


export function Home() {


    const navigation = useNavigation()

    const [debugHome, setDebugHome] = useState<debugHome>("show")
    const [note, setNote] = useState<Array<Note>>([])
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedNote, setSelectedNote] = useState<Array<number>>([])


    const debugGetDebugHome = useCallback(async () => {
        if (appInDevelopment) {
            const getDebugHome = await readDebugHome()
            setDebugHome(getDebugHome)
        } else {
            setDebugHome("hide")
        }
    }, [])

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
            {id: 0, title: "Titulo 1", text: "Texto 1", lastModificationDate: "18:04 08/06/2021"},
            {id: 1, title: "Titulo 2", text: "Texto 2", lastModificationDate: "18:04 08/06/2021"},
            {id: 2, title: "Titulo 3", text: "Texto 3", lastModificationDate: "18:04 08/06/2021"},
            {id: 3, title: "Titulo 4", text: "Texto 4", lastModificationDate: "18:04 08/06/2021"},
            {id: 4, title: "Titulo 5", text: "Texto 5", lastModificationDate: "18:04 08/06/2021"},
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
        // TODO
    }, [])

    const exportSelectedNote = useCallback(() => {
        // TODO
    }, [])

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

    const renderNoteItem = useCallback(({item}: {item: Note}) => {
        return (
            <NoteItem
                click={() => navigation.navigate("Read", {note: item})}
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
        createAllFolder()
        debugGetDebugHome()
        getNote()
    }, [])


    return (
        <SafeScreen>
            <HomeHeader
                selectionMode={selectionMode}
                exitSelectionMode={exitSelectionMode}
                deleteNote={() => {}}
                addNote={() => {}}
                importNote={() => {}}
                exportNote={() => {}}
                encryptFile={() => {}}
                openSettings={() => navigation.navigate("Settings")}
                switchDebugHome={debugSwitchDebugHome}
            />

            <FlatList
                data={note}
                renderItem={renderNoteItem}
                keyExtractor={(item) => item.id.toString()}
                extraData={[selectNote, deselectNote]}
                style={{marginLeft: 6, marginTop: 6}}
            />

            {(note.length === 0) && (
                <EmptyListView>
                    <EmptyListImage source={appIconOutline} />

                    <EmptyListText>
                        Nenhuma nota
                    </EmptyListText>
                </EmptyListView>
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
