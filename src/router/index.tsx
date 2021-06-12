import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { enableScreens } from "react-native-screens"

import { Home } from "../screen/Home"
import { Settings } from "../screen/Settings"
import { Add } from "../screen/Add"
import { Code } from "../screen/Code"
import { Read } from "../screen/Read"


enableScreens()
const Stack = createNativeStackNavigator()


export function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"Home"}
                screenOptions={{
                    headerShown: false,
                    stackAnimation: "fade",
                    replaceAnimation: "push"
                }}
            >
                <Stack.Screen name={"Home"} component={Home} />
                <Stack.Screen name={"Add"} component={Add} />
                <Stack.Screen name={"Code"} component={Code} />
                <Stack.Screen name={"Settings"} component={Settings} />
                <Stack.Screen name={"Read"} component={Read} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
