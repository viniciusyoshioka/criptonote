import { ThemeType } from "@theme"


export type FileExplorerType = "app" | "system"


export interface Settings {
    theme: ThemeType
    fileExplorer: FileExplorerType
}


export interface SettingsContextValue {
    settings: Settings
    setSettings: (settings: Settings) => void
}
