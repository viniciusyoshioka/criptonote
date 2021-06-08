import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"

import { SafeScreen } from "../../component/Screen"
import { appIconOutline, appInDevelopment } from "../../service/constant"
import { DebugHome } from "./DebugHome"
import { HomeHeader } from "./Header"
import { EmptyListImage, EmptyListText, EmptyListView } from "../../component/EmptyList"
import { debugHome, Note } from "../../service/object-type"
import { readDebugHome, readNote, readNoteId, writeDebugHome, writeNote, writeNoteId } from "../../service/storage"
import { createAllFolder } from "../../service/folder-handler"


export function Home() {


    const [debugHome, setDebugHome] = useState<debugHome>("show")
    const [note, setNote] = useState<Array<Document>>([])


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


    useEffect(() => {
        createAllFolder()
        debugGetDebugHome()
        // getNote()
    }, [])


    return (
        <SafeScreen>
            <HomeHeader
                selectionMode={false}
                deleteNote={() => {}}
                addNote={() => {}}
                importNote={() => {}}
                exportNote={() => {}}
                encryptFile={() => {}}
                openSettings={() => {}}
                switchDebugHome={debugSwitchDebugHome}
            />

            <View style={{flex: 1}} />

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
