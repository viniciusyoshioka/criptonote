import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake"
import { useEffect } from "react"


export function useKeepAwakeOnDev() {
    useEffect(() => {
        if (__DEV__) activateKeepAwake()

        return () => {
            if (__DEV__) deactivateKeepAwake()
        }
    }, [])
}
