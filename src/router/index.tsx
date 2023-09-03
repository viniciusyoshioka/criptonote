import { NavigationContainer } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { enableScreens } from "react-native-screens"

import { EditNote } from "@screen/EditNote"
import { Code, Home } from "@screen/Home"
import { ReadNote } from "@screen/ReadNote"
import { ChangeTheme, Settings } from "@screen/Settings"
import { WriteNote } from "@screen/WriteNote"
import { useAppTheme } from "@theme"
import { ScreenParams } from "./types"


export * from "./types"


enableScreens()
const Stack = createNativeStackNavigator<ScreenParams>()


export function Router() {


    const { isDark } = useAppTheme()


    const stackNavigatorScreenOptions: NativeStackNavigationOptions = {
        animation: "fade",
        headerShown: false,
        statusBarColor: "transparent",
        statusBarStyle: isDark ? "light" : "dark",
        statusBarTranslucent: true,
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"} screenOptions={stackNavigatorScreenOptions}>
                <Stack.Screen name={"Home"} component={Home} />
                <Stack.Screen name={"ReadNote"} component={ReadNote} />
                <Stack.Screen name={"EditNote"} component={EditNote} />
                <Stack.Screen name={"WriteNote"} component={WriteNote} />
                <Stack.Screen name={"Settings"} component={Settings} />

                <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                    <Stack.Screen name={"Code"} component={Code} />
                    <Stack.Screen name={"ChangeTheme"} component={ChangeTheme} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
