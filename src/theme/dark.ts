import { ElementiumDarkTheme } from "@elementium/theme"

import { themeDefault } from "./constants"
import { AppThemeType } from "./types"


export const AppDarkTheme: AppThemeType = {
    ...ElementiumDarkTheme,
    appTheme: themeDefault,
    switchTheme: () => {},
}
