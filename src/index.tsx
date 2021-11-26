/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import KeepAwake from "react-native-keep-awake"
import { MenuProvider } from "react-native-popup-menu"
import { ThemeProvider } from "styled-components"
import SQLite from "react-native-sqlite-storage"

import { Router } from "./router"
import { DarkTheme, LightTheme, ThemeContextProvider, themeType } from "./service/theme"
import { DatabaseProvider, NoteDatabase, openDatabase, SettingsDatabase } from "./database"


export function App() {


    const deviceTheme = useColorScheme()

    const [db, setDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [theme, setTheme] = useState<themeType | undefined>()


    async function getTheme() {
        const readAppTheme = await SettingsDatabase.getSettingKey(db!, "theme")

        LightTheme.appTheme = readAppTheme
        LightTheme.switchTheme = switchTheme

        DarkTheme.appTheme = readAppTheme
        DarkTheme.switchTheme = switchTheme

        if (readAppTheme === "auto") {
            if (deviceTheme) {
                setTheme(deviceTheme)
                return
            }
            setTheme("light")
            return
        }
        setTheme(readAppTheme)
    }

    async function switchTheme(newTheme: themeType) {
        await SettingsDatabase.updateSettings(db!, "theme", newTheme)
        await getTheme()
    }


    useEffect(() => {
        if (db) {
            getTheme()
        }
    }, [deviceTheme, db])

    useEffect(() => {
        SQLite.enablePromise(true)

        openDatabase()
            .then(async (database) => {
                await NoteDatabase.createNoteTable(database)
                await SettingsDatabase.createSettingsTable(database)
                setDb(database)
            })
            .catch((error) => {
                // TODO log
            })

        if (!__DEV__ && db) {
            return () => {
                db.close()
            }
        }
    }, [])

    useEffect(() => {
        if (__DEV__) {
            KeepAwake.activate()

            return () => KeepAwake.deactivate()
        }
    }, [])


    if (!theme || !db) {
        return null
    }


    return (
        <ThemeContextProvider value={(theme === "light") ? LightTheme : DarkTheme}>
            <ThemeProvider theme={(theme === "light") ? LightTheme : DarkTheme}>
                <MenuProvider>
                    <DatabaseProvider value={db}>
                        <Router />
                    </DatabaseProvider>
                </MenuProvider>
            </ThemeProvider>
        </ThemeContextProvider>
    )
}
