import { useState } from "react"
import { MMKV } from "react-native-mmkv"

import { storage } from "./mmkv"
import { MMKVHook } from "./types"


export function useMMKVObject<T>(key: string, instance?: MMKV): MMKVHook<T> {


    const currentInstance = instance ?? storage

    function getInitialValue(): T | undefined {
        const object = currentInstance.getString(key)
        return object ? JSON.parse(object) : undefined
    }


    const [valueState, setValueState] = useState<T | undefined>(getInitialValue)


    function setValue(value?: T | ((prev?: T) => T | undefined)) {
        const newValue: T | undefined = (value instanceof Function) ? value() : value
        currentInstance.set(key, JSON.stringify(newValue))
        setValueState(newValue)
    }


    return [valueState, setValue]
}
