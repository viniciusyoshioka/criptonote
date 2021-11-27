import { ToastAndroid } from "react-native"
import RNFS from "react-native-fs"
import SQLite from "react-native-sqlite-storage"

import { openTemporaryDatabase } from "."
import { appName, exportedNoteExtension, fullPathExported, relativePathExported } from "../service/constant"
import { getDateTime } from "../service/date"
import { Note, NoteForList, SimpleNote } from "../service/object-type"
import { getReadPermission, getWritePermission } from "../service/permission"


export function createNoteTable(db: SQLite.SQLiteDatabase): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            CREATE TABLE IF NOT EXISTS note (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL DEFAULT '',
                text TEXT NOT NULL DEFAULT '',
                timestamp TEXT DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
            );
        `)
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export interface QueriedNoteList extends SQLite.ResultSet {
    notes: Array<NoteForList>,
}


export function getNoteList(db: SQLite.SQLiteDatabase): Promise<QueriedNoteList> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            SELECT id, title, timestamp FROM note ORDER BY timestamp DESC;
        `)
            .then(([resultSet]) => {
                resolve({
                    notes: resultSet.rows.raw(),
                    ...resultSet
                })
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export interface QueriedNote extends SQLite.ResultSet {
    note: SimpleNote,
}


export function getNote(db: SQLite.SQLiteDatabase, id: number): Promise<QueriedNote> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            SELECT title, text FROM note WHERE id = ?;
        `, [id])
            .then(([resultSet]) => {
                resolve({
                    note: resultSet.rows.raw()[0],
                    ...resultSet
                })
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function insertNote(db: SQLite.SQLiteDatabase, title: string, text: string): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            INSERT INTO note (title, text) VALUES (?, ?);
        `, [title, text])
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function updateNote(
    db: SQLite.SQLiteDatabase, 
    id: number, 
    title: string, 
    text: string
): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            UPDATE note SET title = ?, text = ?, timestamp = datetime(CURRENT_TIMESTAMP, 'localtime') WHERE id = ?;
        `, [title, text, id])
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function deleteNote(db: SQLite.SQLiteDatabase, id: number[]): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {

        let idToDelete = ""
        if (id.length >= 1) {
            idToDelete += "?"
        }
        for (let i = 1; i < id.length; i++) {
            idToDelete += ", ?"
        }

        db.executeSql(`
            DELETE FROM note WHERE id IN (${idToDelete});
        `, id)
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function exportNote(db: SQLite.SQLiteDatabase, id: number[] = []): Promise<null> {
    return new Promise((resolve, reject) => {
        const temporaryDatabasePath = `${RNFS.CachesDirectoryPath}/../databases/tmp_database_export_note.sqlite`
        getWritePermission()
            .then(async (hasWritePermission: boolean) => {
                if (!hasWritePermission) {
                    reject("Can't export notes without write external storage permission")
                }
                return await RNFS.exists(temporaryDatabasePath)
            })
            .then(async (exists: boolean) => {
                if (exists) {
                    await RNFS.unlink(temporaryDatabasePath)
                }
            })
            .then(async () => {
                const temporaryDatabase = await openTemporaryDatabase("tmp_database_export_note.sqlite")
                await temporaryDatabase.executeSql(`
                    CREATE TABLE IF NOT EXISTS export_note (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL DEFAULT '',
                        text TEXT NOT NULL DEFAULT '',
                        timestamp TEXT DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
                    );
                `)

                let queriedNotesToExport = ""
                if (id.length === 0) {
                    queriedNotesToExport = `
                        SELECT * FROM note;
                    `
                } else {
                    let idToExport = ""
                    if (id.length >= 1) {
                        idToExport += "?"
                    }
                    for (let i = 1; i < id.length; i++) {
                        idToExport += ", ?"
                    }
                    queriedNotesToExport = `
                        SELECT id, title, text, timestamp FROM note WHERE id IN (${idToExport});
                    `
                }

                const [resultSet] = await db.executeSql(queriedNotesToExport)

                for (const note of resultSet.rows.raw() as Note[]) {
                    await temporaryDatabase.executeSql(`
                        INSERT INTO export_note
                            (title, text, timestamp)
                        VALUES
                            (?, ?, ?);
                    `, [note.title, note.text, note.timestamp])
                }

                temporaryDatabase.close()

                let exportedNoteFileName = `${appName} Exported ${getDateTime("-", "-", true, new Date())}.${exportedNoteExtension}`
                let counter = 0
                while (await RNFS.exists(exportedNoteFileName)) {
                    exportedNoteFileName = `${appName} Exported ${getDateTime("-", "-", true, new Date())} ${counter}.${exportedNoteExtension}`
                    counter++
                }

                await RNFS.moveFile(
                    temporaryDatabasePath,
                    `${fullPathExported}/${exportedNoteFileName}`
                )

                ToastAndroid.show(`Notas exportadas para "${relativePathExported}/${exportedNoteFileName}"`, ToastAndroid.LONG)
                resolve(null)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function importNote(db: SQLite.SQLiteDatabase, path: string): Promise<null> {
    return new Promise((resolve, reject) => {
        const temporaryDatabasePath = `${RNFS.CachesDirectoryPath}/../databases/tmp_database_export_note.sqlite`
        getReadPermission()
            .then(async (hasReadPermission: boolean) => {
                if (!hasReadPermission) {
                    reject("Can't import notes without read external storage permission")
                }
            })
            .then(async () => {
                const temporaryDatabaseExists = await RNFS.exists(temporaryDatabasePath)
                if (temporaryDatabaseExists) {
                    await RNFS.unlink(temporaryDatabasePath)
                }
                await RNFS.copyFile(path, temporaryDatabasePath)
            })
            .then(async () => {
                const temporaryDatabase = await openTemporaryDatabase("tmp_database_export_note.sqlite")

                const [queriedNotesToImport] = await temporaryDatabase.executeSql(`
                    SELECT * FROM export_note;
                `)

                for (const note of queriedNotesToImport.rows.raw() as Note[]) {
                    await db.executeSql(`
                        INSERT INTO note
                            (title, text)
                        VALUES
                            (?, ?);
                    `, [note.title, note.text])
                }

                temporaryDatabase.close()
                await RNFS.unlink(temporaryDatabasePath)

                ToastAndroid.show("Notas importadas", ToastAndroid.LONG)
                resolve(null)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
