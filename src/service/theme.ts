import { createContext, useContext } from "react"


export type themeType = "auto" | "light" | "dark"

export const themeDefault: themeType = "auto"


export interface ColorTheme {
    name: themeType,
    appTheme: themeType,
    color: {
        header_background: string,
        header_color: string,

        subHeader_background: string,
        subHeader_color: string,

        screen_background: string,
        screen_color: string,

        popupMenuButton_background: string,
        popupMenuButton_color: string,

        noteItem_background: string,
        noteItem_color: string,
        noteItem_selected_background: string,
        noteItem_selected_color: string,

        settingsButton_background: string,
        settingsButton_color: string,

        fileExplorerItem_background: string,
        fileExplorerItem_color: string,

        modal_background: string,
        modal_color: string,

        modalButton_background: string,
        modalButton_color: string,

        input_background: string,
        input_color: string,
        input_placeholder: string,
        input_border: string,

        radioButton_unchecked_color: string,
        radioButton_checked_color: string,
    },
    opacity: {
        headerEmphasis: number,
        highEmphasis: number,
        mediumEmphasis: number,
        disabled: number,
    },
}

export const LightTheme: ColorTheme = {
    name: "light",
    appTheme: "auto",
    color: {
        header_background: "rgb(60, 100, 220)",
        header_color: "rgb(255, 255, 255)",

        subHeader_background: "rgb(60, 100, 220)",
        subHeader_color: "rgb(255, 255, 255)",

        screen_background: "rgb(255, 255, 255)",
        screen_color: "rgb(0, 0, 0)",

        popupMenuButton_background: "rgb(255, 255, 255)",
        popupMenuButton_color: "rgb(0, 0, 0)",

        noteItem_background: "rgb(255, 255, 255)",
        noteItem_color: "rgb(0, 0, 0)",
        noteItem_selected_background: "rgb(60, 100, 220)",
        noteItem_selected_color: "rgb(90, 90, 90)",

        settingsButton_background: "transparent",
        settingsButton_color: "rgb(0, 0, 0)",

        fileExplorerItem_background: "transparent",
        fileExplorerItem_color: "rgb(0, 0, 0)",

        modal_background: "rgb(255, 255, 255)",
        modal_color: "rgb(0, 0, 0)",

        modalButton_background: "transparent",
        modalButton_color: "rgb(0, 0, 0)",

        input_background: "transparent",
        input_color: "rgb(0, 0, 0)",
        input_placeholder: "rgb(30, 30, 30)",
        input_border: "rgb(0, 0, 0)",

        radioButton_checked_color: "rgb(60, 100, 220)",
        radioButton_unchecked_color: "rgb(0, 0, 0)",
    },
    opacity: {
        headerEmphasis: 1,
        highEmphasis: 0.87,
        mediumEmphasis: 0.6,
        disabled: 0.38,
    },
}

export const DarkTheme: ColorTheme = {
    name: "dark",
    appTheme: "auto",
    color: {
        header_background: "rgb(30, 30, 30)",
        header_color: "rgb(255, 255, 255)",

        subHeader_background: "rgb(30, 30, 30)",
        subHeader_color: "rgb(255, 255, 255)",

        screen_background: "rgb(18, 18, 18)",
        screen_color: "rgb(255, 255, 255)",

        popupMenuButton_background: "rgb(45, 45, 45)",
        popupMenuButton_color: "rgb(255, 255, 255)",

        noteItem_background: "rgb(30, 30, 30)",
        noteItem_color: "rgb(255, 255, 255)",
        noteItem_selected_background: "rgb(180, 200, 255)",
        noteItem_selected_color: "rgb(180, 180, 180)",

        settingsButton_background: "transparent",
        settingsButton_color: "rgb(255, 255, 255)",

        fileExplorerItem_background: "transparent",
        fileExplorerItem_color: "rgb(255, 255, 255)",

        modal_background: "rgb(35, 35, 35)",
        modal_color: "rgb(255, 255, 255)",

        modalButton_background: "transparent",
        modalButton_color: "rgb(255, 255, 255)",

        input_background: "transparent",
        input_color: "rgb(255, 255, 255)",
        input_placeholder: "rgb(150, 150, 150)",
        input_border: "rgb(255, 255, 255)",

        radioButton_checked_color: "rgb(180, 200, 255)",
        radioButton_unchecked_color: "rgb(255, 255, 255)",
    },
    opacity: {
        headerEmphasis: 0.87,
        highEmphasis: 0.87,
        mediumEmphasis: 0.6,
        disabled: 0.38,
    },
}


const ThemeContext = createContext(LightTheme)

export const ThemeContextProvider = ThemeContext.Provider

export function useTheme(): ColorTheme {
    const theme = useContext(ThemeContext)
    return theme
}


const SwitchThemeContext = createContext(async (_newTheme: themeType) => { })

export const SwitchThemeContextProvider = SwitchThemeContext.Provider

export function useSwitchTheme(): (newTheme: themeType) => Promise<void> {
    const switchTheme = useContext(SwitchThemeContext)
    return switchTheme
}


export interface styledProps {
    theme: ColorTheme
}


export function join(theme: ColorTheme, value: themeType): ColorTheme {
    theme["appTheme"] = value
    return theme
}
