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


// Settings
export type settingsObject = {
    theme: themeType,
    lockType: lockType,
    appLock: string,
    dbVersion: string,
}

export type settingKey = "theme" | "lockType" | "appLock" | "dbVersion"
