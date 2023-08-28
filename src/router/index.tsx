import { NavigationContainer } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { enableScreens } from "react-native-screens"

import { Home } from "@screen/Home"
import { ScreenParams } from "./types"


export * from "./types"


enableScreens()
const Stack = createNativeStackNavigator<ScreenParams>()


export function Router() {


    const stackNavigatorScreenOptions: NativeStackNavigationOptions = {
        animation: "fade",
        headerShown: false,
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"} screenOptions={stackNavigatorScreenOptions}>
                <Stack.Screen name={"Home"} component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
