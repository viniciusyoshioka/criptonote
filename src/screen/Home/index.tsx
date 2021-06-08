import React from "react"
import { View } from "react-native"

import { SafeScreen } from "../../component/Screen"
import { DebugHome } from "./DebugHome"
import { HomeHeader } from "./Header"


export function Home() {
    return (
        <SafeScreen>
            <HomeHeader />

            <View style={{flex: 1}} />

            <DebugHome
                debugReadDocument={() => {}}
                debugWriteDocument={() => {}}
                debugClearDocument={() => {}}
            />
        </SafeScreen>
    )
}
