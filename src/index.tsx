import React, { useEffect } from "react"
import KeepAwake from "react-native-keep-awake"

import { Router } from "./router"


export function App() {


    useEffect(() => {
        if (__DEV__) {
            KeepAwake.activate()

            return () => KeepAwake.deactivate()
        }
    }, [])


    return (
        <Router />
    )
}
