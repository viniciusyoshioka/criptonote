import { Alert, ToastAndroid } from "react-native"
import RNFS from "react-native-fs"
import base64 from "react-native-base64"

import { getDateTime } from "./date"
import { log } from "./log"
import { Note, ExportedNote } from "./object-type"
import { readNote, readNoteId, writeNote, writeNoteId } from "./storage"
import { folderExported, folderRoot, fullPathExported } from "./constant"
import { createExportedFolder } from "./folder-handler"


export async function getId(): Promise<number> {
    const noteId = await readNoteId()

    let minimumId = 0
    while (noteId.includes(minimumId)) {
        minimumId += 1
    }
    return minimumId
}


async function createNote(title: string, text: string): Promise<Note> {
    const id = await getId()
    const date = getDateTime()
    return {
        id: id,
        title: title,
        text: text,
        lastModificationDate: date
    }
}

export async function saveNewNote(title: string, text: string): Promise<Note> {
    const newNote = await createNote(title, text)

    // noteId
    const noteId = await readNoteId()
    noteId.unshift(newNote.id)
    await writeNoteId(noteId)

    // note
    const noteList = await readNote()
    noteList.unshift(newNote)
    await writeNote(noteList)

    return newNote
}


async function editNote(note: Note, title: string, text: string): Promise<Note> {
    const date = getDateTime()
    return {
        id: note.id,
        title: title,
        text: text,
        lastModificationDate: date
    }
}

export async function saveEditedNote(note: Note, title: string, text: string): Promise<Note> {
    await deleteNote([note.id])

    const editedNote = await editNote(note, title, text)

    // noteId
    const noteId = await readNoteId()
    noteId.unshift(editedNote.id)
    await writeNoteId(noteId)

    // note
    const noteList = await readNote()
    noteList.unshift(editedNote)
    await writeNote(noteList)

    return editedNote
}


export async function deleteNote(ids: Array<number>) {
    // noteId
    const noteId = await readNoteId()
    const noteIdIndex: Array<number> = []
    noteId.forEach((item: number, index: number) => {
        if (ids.includes(item)) {
            noteIdIndex.push(index)
        }
    })
    noteIdIndex.reverse()
    noteIdIndex.forEach((item: number) => {
        noteId.splice(item, 1)
    })
    await writeNoteId(noteId)

    // note
    const note = await readNote()
    const noteIndex: Array<number> = []
    note.forEach((item: Note, index: number) => {
        if (ids.includes(item.id)) {
            noteIndex.push(index)
        }
    })
    noteIndex.reverse()
    noteIndex.forEach((item: number) => {
        note.splice(item, 1)
    })
    await writeNote(note)
}


export async function exportNote(ids: Array<number>, selectionMode: boolean): Promise<boolean> {
    const note = await readNote()

    // Check if there is note to export in app
    if (note.length === 0) {
        Alert.alert(
            "Aviso",
            "Não há notas para exportar"
        )
        return false
    }

    // Get note to export
    let noteToExport: Array<ExportedNote> = []
    if (selectionMode) {
        const tempNoteToExport = note.filter((item: Note) => {
            return ids.includes(item.id)
        })
        noteToExport = tempNoteToExport.map((item: Note) => {
            return {
                title: item.title,
                text: item.text,
            }
        })
    } else {
        noteToExport = note.map((item: Note) => {
            return {
                title: item.title,
                text: item.text,
            }
        })
    }

    // Create required folders
    await createExportedFolder()

    // Create file with note data
    // TODO
    const fileName = "index.txt"
    const filePath = `${fullPathExported}/${fileName}`
    const content = base64.encode(JSON.stringify(noteToExport))
    try {
        await RNFS.writeFile(filePath, content, "base64")
    } catch (error) {
        log("ERROR", `Erro criando e escrevendo arquivo de notas para exportar. Mensagem: "${error}"`)
        Alert.alert(
            "Erro",
            "Erro desconhecido ao exportar notas. Processo interrompido"
        )
        return false
    }

    // Alert export has finished
    ToastAndroid.show(`Notas exportadas para "Memória Interna/${folderRoot}/${folderExported}/${fileName}"`, 10)
    return true
}

export async function importNote(path: string): Promise<boolean> {
    // Check if file to import exists
    if (!await RNFS.exists(path)) {
        Alert.alert(
            "Erro",
            "Arquivo selecionado não existe"
        )
        return false
    }

    // Check file extension
    // TODO
    const splitedPath = path.split("/")
    const fileName = splitedPath[splitedPath.length - 1]
    if (!fileName.endsWith(".zip")) {
        Alert.alert(
            "Erro",
            "Arquivo selecionado não é uma nota exportada"
        )
        return false
    }

    // Read note file
    let fileContent = ""
    try {
        fileContent = await RNFS.readFile(path, "base64")
    } catch (error) {
        log("ERROR", `Erro lendo arquivo de notas para importar. Mensagem: "${error}"`)
        Alert.alert(
            "Erro",
            "Erro desconhecido ao importar notas. Processo interrompido"
        )
        return false
    }
    const exportedNoteData: Array<ExportedNote> = JSON.parse(base64.decode(fileContent))
    const importedNote: Array<Note> = []
    for (let x = 0; x < exportedNoteData.length; x++) {
        // Create and add note
        const newNote = await createNote(
            exportedNoteData[x].title, exportedNoteData[x].text
        )
        importedNote.push(newNote)

        // Write new note id
        const noteId = await readNoteId()
        noteId.push(newNote.id)
        await writeNoteId(noteId)
    }

    // Write imported note
    const note = await readNote()
    const newNote = [...importedNote, ...note]
    await writeNote(newNote)

    // Warn import has finished
    ToastAndroid.show("Notas importadas", 10)
    return true
}
