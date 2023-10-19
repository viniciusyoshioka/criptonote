import { ThemeType } from "@theme"


export interface Settings {
    theme: ThemeType
}


export interface SettingsContextValue {
    settings: Settings
    setSettings: (settings: Settings) => void
}
