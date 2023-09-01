import { LightTheme as ElementiumLightTheme } from "@elementium/native"

import { themeDefault } from "./constants"
import { AppThemeType } from "./types"


export const AppLightTheme: AppThemeType = {
    ...ElementiumLightTheme,
    appTheme: themeDefault,
    switchTheme: () => {},
}
