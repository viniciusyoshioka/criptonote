import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { enableScreens } from "react-native-screens"

import { Lock } from "../screen/Lock"
import { Home } from "../screen/Home"
import { Add } from "../screen/Add"
import { Code } from "../screen/Code"
import { Settings } from "../screen/Settings"
import { Read } from "../screen/Read"
import { FileExplorer } from "../screen/FileExplorer"
import { FileEncryption } from "../screen/FileEncryption"
import { ProcessingEncryption } from "../screen/ProcessingEncryption"


enableScreens()
const Stack = createNativeStackNavigator()


export function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"Lock"}
                screenOptions={{
                    headerShown: false,
                    stackAnimation: "fade",
                    replaceAnimation: "push"
                }}
            >
                <Stack.Screen name={"Lock"} component={Lock} />
                <Stack.Screen name={"Home"} component={Home} />
                <Stack.Screen name={"Add"} component={Add} />
                <Stack.Screen name={"Code"} component={Code} />
                <Stack.Screen name={"Settings"} component={Settings} />
                <Stack.Screen name={"Read"} component={Read} />
                <Stack.Screen name={"FileExplorer"} component={FileExplorer} />
                <Stack.Screen name={"FileEncryption"} component={FileEncryption} />
                <Stack.Screen name={"ProcessingEncryption"} component={ProcessingEncryption} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
