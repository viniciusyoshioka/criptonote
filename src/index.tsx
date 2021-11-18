import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import KeepAwake from "react-native-keep-awake"
import { MenuProvider } from "react-native-popup-menu"
import { ThemeProvider } from "styled-components"

import { Router } from "./router"
import { readTheme, writeTheme } from "./service/storage"
import { DarkTheme, LightTheme, ThemeContextProvider, themeType } from "./service/theme"


export function App() {


    const deviceTheme = useColorScheme()
    const [theme, setTheme] = useState<themeType | undefined>()


    async function getTheme() {
        const readAppTheme = await readTheme()

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
        await writeTheme(newTheme)
        await getTheme()
    }


    useEffect(() => {
        getTheme()
    }, [deviceTheme])

    useEffect(() => {
        if (__DEV__) {
            KeepAwake.activate()

            return () => KeepAwake.deactivate()
        }
    }, [])


    if (theme === undefined) {
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
