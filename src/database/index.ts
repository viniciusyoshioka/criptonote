import { createContext, useContext } from "react"
import SQLite from "react-native-sqlite-storage"

import * as NoteDatabase from "./Note"
export { NoteDatabase }

import * as SettingsDatabase from "./Settings"
export { SettingsDatabase }


export function openDatabase(): Promise<SQLite.SQLiteDatabase> {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({
            name: "criptonote_database.sqlite",
            location: "default"
        })
            .then((db) => {
                resolve(db)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


const databaseContext = createContext(undefined as unknown as SQLite.SQLiteDatabase)

export const DatabaseProvider = databaseContext.Provider

export function useDatabase(): SQLite.SQLiteDatabase {
    return useContext(databaseContext)
}
