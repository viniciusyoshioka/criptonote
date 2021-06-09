import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { Home } from "../screen/Home"
import { Settings } from "../screen/Settings"
import { Add } from "../screen/Add"
import { Code } from "../screen/Code"
import { Read } from "../screen/Read"


const Stack = createStackNavigator()


export function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Home"} component={Home} />
                <Stack.Screen name={"Add"} component={Add} />
                <Stack.Screen name={"Code"} component={Code} />
                <Stack.Screen name={"Settings"} component={Settings} />
                <Stack.Screen name={"Read"} component={Read} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
