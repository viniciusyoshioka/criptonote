import { Settings, SettingsContextValue } from "./types"


export const settingsDefault: Settings = {
    theme: "auto",
    fileExplorer: "app",
    allowScreenshot: false,
}


export const settingsContextDefaultValue: SettingsContextValue = {
    settings: settingsDefault,
    setSettings: () => {},
}
