import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage"

import * as NoteDatabase from "./Note"
export { NoteDatabase }


export function openDatabase(): Promise<SQLiteDatabase> {
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
