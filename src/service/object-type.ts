import { themeType } from "./theme"

// Note
export type NoteForList = {
    id: number,
    title: string,
    timestamp: string,
}

export type SimpleNote = {
    title: string,
    text: string,
}

export type Note = {
    id: number,
    title: string,
    text: string,
    timestamp: string,
}


// Lock type
export type lockType = "none" | "pin" | "text" | "bio"
export const lockTypeDefault: lockType = "none"


export type settingsObject = {
    theme: themeType,
    lockType: lockType,
    dbVersion: string,
}
