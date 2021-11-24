/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import KeepAwake from "react-native-keep-awake"
import { MenuProvider } from "react-native-popup-menu"
import { ThemeProvider } from "styled-components"
import SQLite from "react-native-sqlite-storage"

import { Router } from "./router"
import { readTheme, writeTheme } from "./service/storage"
import { DarkTheme, join, LightTheme, SwitchThemeContextProvider, ThemeContextProvider, themeType } from "./service/theme"
import { DatabaseProvider, NoteDatabase, openDatabase, SettingsDatabase } from "./database"


export function App() {


    const deviceTheme = useColorScheme()

    const [db, setDb] = useState<SQLite.SQLiteDatabase | undefined>(undefined)
    const [appTheme, setAppTheme] = useState<themeType>("auto")
    const [theme, setTheme] = useState<themeType | undefined>(undefined)


    const getTheme = useCallback(async () => {
        const readAppTheme = await readTheme()
        if (readAppTheme === "auto") {
            if (deviceTheme) {
                setAppTheme(readAppTheme)
                setTheme(deviceTheme)
                return
            }
            setAppTheme(readAppTheme)
            setTheme("light")
            return
        }
        setAppTheme(readAppTheme)
        setTheme(readAppTheme)
    }, [deviceTheme])

    const switchTheme = useCallback(async (newTheme: themeType) => {
        await writeTheme(newTheme)
        await getTheme()
    }, [])


    useEffect(() => {
        getTheme()
    }, [deviceTheme])

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
        <ThemeContextProvider value={(theme === "light") ? join(LightTheme, appTheme) : join(DarkTheme, appTheme)}>
            <SwitchThemeContextProvider value={switchTheme}>
                <ThemeProvider theme={(theme === "light") ? join(LightTheme, appTheme) : join(DarkTheme, appTheme)}>
                    <MenuProvider>
                        <DatabaseProvider value={db}>
                            <Router />
                        </DatabaseProvider>
                    </MenuProvider>
                </ThemeProvider>
            </SwitchThemeContextProvider>
        </ThemeContextProvider>
    )
}
