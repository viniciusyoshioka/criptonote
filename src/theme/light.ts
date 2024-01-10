import { ElementiumLightTheme } from "@elementium/theme"

import { themeDefault } from "./constants"
import { AppThemeType } from "./types"


export const AppLightTheme: AppThemeType = {
    ...ElementiumLightTheme,
    appTheme: themeDefault,
    switchTheme: () => {},
}
