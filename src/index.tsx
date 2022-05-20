import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import KeepAwake from "react-native-keep-awake"
import { MenuProvider } from "react-native-popup-menu"
import SQLite from "react-native-sqlite-storage"
import { ThemeProvider } from "styled-components"

import { LogDatabase, NoteDatabase, openAppDatabase, openLogDatabase, setGlobalAppDatabase, setGlobalLogDatabase, SettingsDatabase } from "./database"
import { Router } from "./router"
import { logCriticalError } from "./service/log"
import { DarkTheme, LightTheme, ThemeContextProvider, themeType } from "./service/theme"


export function App() {


    const deviceTheme = useColorScheme()

    const [appDb, setAppDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [logDb, setLogDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [theme, setTheme] = useState<themeType | undefined>()


    async function getTheme() {
        const appTheme = await SettingsDatabase.getSettingKey("theme")

        LightTheme.appTheme = appTheme
        LightTheme.switchTheme = switchTheme

        DarkTheme.appTheme = appTheme
        DarkTheme.switchTheme = switchTheme

        if (appTheme === "auto") {
            if (deviceTheme) {
                setTheme(deviceTheme)
                return
            }
            setTheme("light")
            return
        }
        setTheme(appTheme)
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
                logCriticalError(`Error opening app database: "${JSON.stringify(error)}"`)
            })

        openLogDatabase()
            .then(async (database) => {
                setGlobalLogDatabase(database)
                await LogDatabase.createLogTable()
                setLogDb(database)
            })
            .catch((error) => {
                logCriticalError(`Error opening log database: "${JSON.stringify(error)}"`)
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeContextProvider value={(theme === "light") ? LightTheme : DarkTheme}>
                <ThemeProvider theme={(theme === "light") ? LightTheme : DarkTheme}>
                    <MenuProvider>
                        <Router />
                    </MenuProvider>
                </ThemeProvider>
            </ThemeContextProvider>
        </GestureHandlerRootView>
    )
}
