import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { RealmProvider } from "@database"
import { useKeepAwakeOnDev } from "@hooks"
import { Router } from "@router"
import { SettingsProvider } from "@services/settings"
import { AppThemeProvider } from "@theme"


// TODO switch to custom alert component
// TODO add input to header of WriteNote and EditNote
// TODO add rich text input to WriteNote and EditNote
// TODO remove ReadNote when rich text input is implemented
// TODO add password recovery
export function App() {


    useKeepAwakeOnDev()


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <RealmProvider>
                <SettingsProvider>
                    <AppThemeProvider>
                        <KeyboardProvider statusBarTranslucent={true}>
                            <Router />
                        </KeyboardProvider>
                    </AppThemeProvider>
                </SettingsProvider>
            </RealmProvider>
        </GestureHandlerRootView>
    )
}
