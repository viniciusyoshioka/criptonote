import React from "react"
import { View } from "react-native"

import { SafeScreen } from "../../component/Screen"
import { appIconOutline } from "../../service/constant"
import { DebugHome } from "./DebugHome"
import { HomeHeader } from "./Header"
import { EmptyListImage, EmptyListText, EmptyListView } from "../../component/EmptyList"


export function Home() {
    return (
        <SafeScreen>
            <HomeHeader />

            <View style={{flex: 1}} />

            <EmptyListView>
                <EmptyListImage source={appIconOutline} />

                <EmptyListText>
                    Nenhuma nota
                </EmptyListText>
            </EmptyListView>

            <DebugHome
                debugReadDocument={() => {}}
                debugWriteDocument={() => {}}
                debugClearDocument={() => {}}
            />
        </SafeScreen>
    )
}
