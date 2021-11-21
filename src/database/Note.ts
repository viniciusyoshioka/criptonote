import SQLite from "react-native-sqlite-storage"

import { NoteForList, SimpleNote } from "../service/object-type"


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
