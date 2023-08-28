import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MenuProvider } from "react-native-popup-menu"
import { ThemeProvider } from "styled-components"

import { useKeepAwakeOnDev } from "@hooks"
import { Router } from "@router"
import { DarkTheme, ThemeContextProvider } from "./service/theme"


export function App() {


    useKeepAwakeOnDev()


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeContextProvider value={DarkTheme}>
                <ThemeProvider theme={DarkTheme}>
                    <MenuProvider>
                        <Router />
                    </MenuProvider>
                </ThemeProvider>
            </ThemeContextProvider>
        </GestureHandlerRootView>
    )
}
