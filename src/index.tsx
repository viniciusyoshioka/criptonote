import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MenuProvider } from "react-native-popup-menu"
import { ThemeProvider } from "styled-components"

import { RealmProvider } from "@database"
import { useKeepAwakeOnDev } from "@hooks"
import { Router } from "@router"
import { SettingsProvider } from "@services/settings"
import { AppThemeProvider } from "@theme"
import { DarkTheme, ThemeContextProvider } from "./service/theme"


export function App() {


    useKeepAwakeOnDev()


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <RealmProvider>
                <SettingsProvider>
                    <AppThemeProvider>
                        <ThemeContextProvider value={DarkTheme}>
                            <ThemeProvider theme={DarkTheme}>
                                <MenuProvider>
                                    <Router />
                                </MenuProvider>
                            </ThemeProvider>
                        </ThemeContextProvider>
                    </AppThemeProvider>
                </SettingsProvider>
            </RealmProvider>
        </GestureHandlerRootView>
    )
}
