import SQLite from "react-native-sqlite-storage"

import { globalLogDatabase } from "."


export function createLogTable(): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {
        globalLogDatabase.executeSql(`
            CREATE TABLE IF NOT EXISTS log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT,
                message TEXT,
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


export function insertLog(code: string, message: string): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {
        globalLogDatabase.executeSql(`
            INSERT INTO log (code, message) VALUES (?, ?);
        `, [code, message])
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
