import AsyncStorage from "@react-native-async-storage/async-storage"

import { storageLock, storageLockType, storageNote, storageNoteId, storageTheme } from "./constant"
import { log } from "./log"
import { lockType, lockTypeDefault, Note } from "./object-type"
import { themeDefault, themeType } from "./theme"


async function write(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        log("ERROR", `storage write - Erro ao definir item no AsyncStorage. Mensagem: "${error}"`)
    }
}

async function read(key: string): Promise<string | null> {
    try {
        const readValue = await AsyncStorage.getItem(key)
        return readValue
    } catch (error) {
        log("ERROR", `storage read - Erro ao ler item do AsyncStorage. Mensagem: "${error}"`)
        return null
    }
}


export async function writeTheme(value: themeType) {
    await write(storageTheme, value)
}

export async function readTheme(): Promise<themeType> {
    const theme = await read(storageTheme)
    if (theme === null) {
        await writeTheme(themeDefault)
        return themeDefault
    }
    return theme as themeType
}


export async function writeNoteId(value: Array<number>) {
    await write(storageNoteId, JSON.stringify(value))
}

export async function readNoteId(): Promise<Array<number>> {
    const noteId = await read(storageNoteId)
    if (noteId === null) {
        await writeNoteId([])
        return []
    }
    return JSON.parse(noteId)
}


export async function writeNote(value: Array<Note>) {
    await write(storageNote, JSON.stringify(value))
}

export async function readNote(): Promise<Array<Note>> {
    const note = await read(storageNote)
    if (note === null) {
        await writeNote([])
        return []
    }
    return JSON.parse(note)
}


export async function writeLock(value: string) {
    await write(storageLock, value)
}

export async function readLock(): Promise<string> {
    const lock = await read(storageLock)
    if (lock === null) {
        await writeLock("")
        return ""
    }
    return lock
}


export async function writeLockType(value: lockType) {
    await write(storageLockType, value)
}

export async function readLockType(): Promise<lockType> {
    const lockType = await read(storageLockType)
    if (lockType === null) {
        await writeLockType(lockTypeDefault)
        return lockTypeDefault
    }
    return lockType as lockType
}
