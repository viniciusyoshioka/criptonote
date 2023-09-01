import { Settings, SettingsContextValue } from "./types"


export const settingsDefault: Settings = {
    theme: "auto",
}


export const settingsContextDefaultValue: SettingsContextValue = {
    settings: settingsDefault,
    setSettings: () => {},
}
