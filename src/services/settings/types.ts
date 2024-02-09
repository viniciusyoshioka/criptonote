import { ThemeType } from "@theme"


export type FileExplorerType = "app" | "system"


export interface Settings {
    theme: ThemeType
    fileExplorer: FileExplorerType
    allowScreenshot: boolean
}


export interface SettingsContextValue {
    settings: Settings
    setSettings: (settings: Settings) => void
}
