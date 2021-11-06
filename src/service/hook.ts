import { useEffect } from "react"
import { BackHandler, Keyboard, KeyboardEventListener, KeyboardEventName } from "react-native"


export function useBackHandler(backhandlerFunction: () => boolean) {
    useEffect(() => {
        const subscription = BackHandler.addEventListener("hardwareBackPress", backhandlerFunction)
        return () => subscription.remove()
    })
}


export function useKeyboard(eventName: KeyboardEventName, keyboardFunction: KeyboardEventListener) {
    useEffect(() => {
        const subscription = Keyboard.addListener(eventName, keyboardFunction)
        return () => subscription.remove()
    })
}
