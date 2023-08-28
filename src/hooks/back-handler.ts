import { useEffect } from "react"
import { BackHandler } from "react-native"


export function useBackHandler(backhandlerFunction: () => boolean | null | undefined) {
    useEffect(() => {
        const subscription = BackHandler.addEventListener("hardwareBackPress", backhandlerFunction)
        return () => subscription.remove()
    })
}
