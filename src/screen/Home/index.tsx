import React from "react"

import { SafeScreen } from "../../component/Screen"
import { HomeHeader } from "./Header"


export function Home() {
    return (
        <SafeScreen>
            <HomeHeader />
        </SafeScreen>
    )
}
