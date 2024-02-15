import { ElementiumThemeType } from "@elementium/theme"


export type ThemeType = "auto" | "light" | "dark"


export interface AppThemeType extends ElementiumThemeType {
    appTheme: ThemeType
    switchTheme: (newTheme: ThemeType) => void
}
