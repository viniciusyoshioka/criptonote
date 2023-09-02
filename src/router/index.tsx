import { NavigationContainer } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { enableScreens } from "react-native-screens"

import { Home } from "@screen/Home"
import { ChangeTheme, Settings } from "@screen/Settings"
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
                <Stack.Screen name={"Settings"} component={Settings} />

                <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                    <Stack.Screen name={"ChangeTheme"} component={ChangeTheme} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
