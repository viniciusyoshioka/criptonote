import { UnistylesRegistry } from "react-native-unistyles"

import { breakpoints } from "./breakpoints"
import { darkTheme } from "./theme-dark"
import { lightTheme } from "./theme-light"


type Breakpoints = typeof breakpoints

type Themes = {
    light: typeof lightTheme,
    dark: typeof darkTheme,
}

declare module "react-native-unistyles" {
    export interface UnistylesBreakpoints extends Breakpoints {}
    export interface UnistylesThemes extends Themes {}
}


UnistylesRegistry
    .addBreakpoints(breakpoints)
    .addThemes({
        light: lightTheme,
        dark: darkTheme,
    })
    .addConfig({
        adaptiveThemes: true,
    })
