/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import KeepAwake from "react-native-keep-awake"
import { MenuProvider } from "react-native-popup-menu"
import { ThemeProvider } from "styled-components"
import SQLite from "react-native-sqlite-storage"

import { Router } from "./router"
import { DarkTheme, LightTheme, ThemeContextProvider, themeType } from "./service/theme"
import { LogDatabase, NoteDatabase, openAppDatabase, openLogDatabase, setGlobalAppDatabase, setGlobalLogDatabase, SettingsDatabase } from "./database"
import { logCriticalError } from "./service/log"


export function App() {


    const deviceTheme = useColorScheme()

    const [appDb, setAppDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [logDb, setLogDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [theme, setTheme] = useState<themeType | undefined>()


    async function getTheme() {
        const readAppTheme = await SettingsDatabase.getSettingKey("theme")

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
        await SettingsDatabase.updateSettings("theme", newTheme)
        await getTheme()
    }


    useEffect(() => {
        if (appDb && logDb) {
            getTheme()
        }
    }, [deviceTheme, appDb, logDb])

    useEffect(() => {
        SQLite.enablePromise(true)

        openAppDatabase()
            .then(async (database) => {
                setGlobalAppDatabase(database)
                await NoteDatabase.createNoteTable()
                await SettingsDatabase.createSettingsTable()
                setAppDb(database)
            })
            .catch((error) => {
                logCriticalError(`Error opening app database: "${error}"`)
            })

        openLogDatabase()
            .then(async (database) => {
                setGlobalLogDatabase(database)
                await LogDatabase.createLogTable()
                setLogDb(database)
            })
            .catch((error) => {
                logCriticalError(`Error opening log database: "${error}"`)
            })
    }, [])

    useEffect(() => {
        if (__DEV__) {
            KeepAwake.activate()

            return () => KeepAwake.deactivate()
        }
    }, [])


    if (!theme || !appDb || !logDb) {
        return null
    }


    return (
        <ThemeContextProvider value={(theme === "light") ? LightTheme : DarkTheme}>
            <ThemeProvider theme={(theme === "light") ? LightTheme : DarkTheme}>
                <MenuProvider>
                    <Router />
                </MenuProvider>
            </ThemeProvider>
        </ThemeContextProvider>
    )
}
