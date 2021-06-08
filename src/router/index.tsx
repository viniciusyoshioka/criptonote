import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { enableScreens } from "react-native-screens"

import { Home } from "../screen/Home"


enableScreens()
const Stack = createNativeStackNavigator()


export function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"Home"}
                screenOptions={{
                    headerShown: false,
                    replaceAnimation: "push",
                    stackAnimation: "fade",
                }}
            >
                <Stack.Screen
                    name={"Home"}
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
