import SQLite from "react-native-sqlite-storage"

import { latestDbVersion } from "../service/constant"
import { lockTypeDefault, settingsObject } from "../service/object-type"
import { themeDefault } from "../service/theme"


export function createSettingsTable(db: SQLite.SQLiteDatabase): Promise<null> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'settings';
        `)
            .then(async ([resultSet]) => {
                return resultSet.rows.length === 1
            })
            .then(async (settingsTableExists: boolean) => {
                if (!settingsTableExists) {
                    await db.executeSql(`
                        CREATE TABLE settings (
                            key TEXT,
                            value TEXT,
                            PRIMARY KEY("key")
                        );
                    `)
                    await db.executeSql(`
                        INSERT INTO settings 
                            (key, value) 
                        VALUES 
                            ('theme', ?),
                            ('lockType', ?)
                            ('dbVersion', ?);
                    `, [themeDefault, lockTypeDefault, latestDbVersion])
                }
                resolve(null)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function getSettings(db: SQLite.SQLiteDatabase): Promise<settingsObject> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            SELECT * FROM settings;
        `)
            .then(([resultSet]) => {
                const settings = {}
                resultSet.rows.raw().forEach((item) => {
                    settings[item.key] = item.value
                })
                console.log("getSettings settings", settings)
                resolve(settings as settingsObject)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function insertSettings(db: SQLite.SQLiteDatabase, key: string, value: string): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            INSERT INTO settings (key, value) VALUES (?, ?);
        `, [key, value])
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function updateSettings(db: SQLite.SQLiteDatabase, key: string, value: string): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {
        db.executeSql(`
            UPDATE settings SET value = ? WHERE key = ?;
        `, [value, key])
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function deleteSettings(db: SQLite.SQLiteDatabase, keys: string[]): Promise<SQLite.ResultSet> {
    return new Promise((resolve, reject) => {

        let keysToDelete = ""
        if (keys.length >= 1) {
            keysToDelete += "?"
        }
        for (let i = 1; i < keys.length; i++) {
            keysToDelete += ", ?"
        }

        db.executeSql(`
            DELETE FROM settings WHERE key IN (${keysToDelete});
        ` )
            .then(([resultSet]) => {
                resolve(resultSet)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
