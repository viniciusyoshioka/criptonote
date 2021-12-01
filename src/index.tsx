/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import KeepAwake from "react-native-keep-awake"
import { MenuProvider } from "react-native-popup-menu"
import { ThemeProvider } from "styled-components"
import SQLite from "react-native-sqlite-storage"

import { Router } from "./router"
import { DarkTheme, LightTheme, ThemeContextProvider, themeType } from "./service/theme"
import { DatabaseProvider, LogDatabase, NoteDatabase, openAppDatabase, openLogDatabase, setGlobalAppDatabase, setGlobalLogDatabase, SettingsDatabase } from "./database"


export function App() {


    const deviceTheme = useColorScheme()

    const [appDb, setAppDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [logDb, setLogDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [theme, setTheme] = useState<themeType | undefined>()


    async function getTheme() {
        const readAppTheme = await SettingsDatabase.getSettingKey(appDb!, "theme")

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
        await SettingsDatabase.updateSettings(appDb!, "theme", newTheme)
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
                await NoteDatabase.createNoteTable(database)
                await SettingsDatabase.createSettingsTable(database)
                setAppDb(database)
            })
            .catch((error) => {
                // TODO log
            })

        openLogDatabase()
            .then(async (database) => {
                setGlobalLogDatabase(database)
                await LogDatabase.createLogTable()
                setLogDb(database)
            })
            .catch((error) => {
                // TODO log
            })

        if (!__DEV__ && appDb && logDb) {
            return () => {
                appDb.close()
                logDb.close()
            }
        }
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
                    <DatabaseProvider value={appDb}>
                        <Router />
                    </DatabaseProvider>
                </MenuProvider>
            </ThemeProvider>
        </ThemeContextProvider>
    )
}
