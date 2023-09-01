import { DarkTheme as ElementiumDarkTheme } from "@elementium/native"

import { themeDefault } from "./constants"
import { AppThemeType } from "./types"


export const AppDarkTheme: AppThemeType = {
    ...ElementiumDarkTheme,
    appTheme: themeDefault,
    switchTheme: () => {},
}
