import { useEffect } from "react"
import { Keyboard, KeyboardEventListener, KeyboardEventName } from "react-native"


export function useKeyboard(eventName: KeyboardEventName, keyboardFunction: KeyboardEventListener) {
    useEffect(() => {
        const subscription = Keyboard.addListener(eventName, keyboardFunction)
        return () => subscription.remove()
    })
}
