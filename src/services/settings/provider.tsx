import { ReactNode, createContext, useContext, useEffect } from "react"

import { AppStorageKeys, storage, useMMKVObject } from "../storage"
import { settingsContextDefaultValue, settingsDefault } from "./constants"
import { Settings, SettingsContextValue } from "./types"


const SettingsContext = createContext<SettingsContextValue>(settingsContextDefaultValue)


export interface SettingsProviderProps {
    children?: ReactNode
}


export function SettingsProvider(props: SettingsProviderProps) {


    const [settings, setSettings] = useMMKVObject<Settings>(AppStorageKeys.SETTINGS)


    useEffect(() => {
        const allKeys = storage.getAllKeys()
        if (allKeys.length === 0)
            setSettings(settingsDefault)
    }, [])


    if (!settings) return null


    return (
        <SettingsContext.Provider
            value={{ settings, setSettings }}
            children={props.children}
        />
    )
}


export function useSettings() {
    return useContext(SettingsContext)
}
