import SQLite from "react-native-sqlite-storage"

import { appDatabaseFileName, logDatabaseFileName } from "../service/constant"


import * as LogDatabase from "./Log"
export { LogDatabase }


import * as NoteDatabase from "./Note"
export { NoteDatabase }


import * as SettingsDatabase from "./Settings"
export { SettingsDatabase }


export let globalAppDatabase: SQLite.SQLiteDatabase
export let globalLogDatabase: SQLite.SQLiteDatabase


export function setGlobalAppDatabase(database: SQLite.SQLiteDatabase) {
    globalAppDatabase = database
}


export function setGlobalLogDatabase(database: SQLite.SQLiteDatabase) {
    globalLogDatabase = database
}


export function openAppDatabase(): Promise<SQLite.SQLiteDatabase> {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({
            name: appDatabaseFileName,
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


export function openLogDatabase(): Promise<SQLite.SQLiteDatabase> {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({
            name: logDatabaseFileName,
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


export function openTemporaryDatabase(databaseFileName: string): Promise<SQLite.SQLiteDatabase> {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({
            name: databaseFileName,
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
