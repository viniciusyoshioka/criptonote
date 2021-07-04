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

        listItem_background: string,
        listItem_color: string,

        modal_background: string,
        modal_color: string,

        modalButton_background: string,
        modalButton_color: string,

        input_background: string,
        input_color: string,
        input_placeholder: string,
        input_unfocus_border: string,
        input_focus_border: string,
        input_selection: string,

        showPasswordButton_background: string,
        showPasswordButton_color: string,

        openNoteButton_background: string,
        openNoteButton_color: string,

        radioButton_unchecked_color: string,
        radioButton_checked_color: string,

        checkButton_unchecked_color: string,
        checkButton_checked_color: string,
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
        header_background: "rgb(0, 128, 128)",
        header_color: "rgb(255, 255, 255)",

        subHeader_background: "rgb(0, 128, 128)",
        subHeader_color: "rgb(255, 255, 255)",

        screen_background: "rgb(245, 245, 245)",
        screen_color: "rgb(0, 0, 0)",

        popupMenuButton_background: "rgb(255, 255, 255)",
        popupMenuButton_color: "rgb(0, 0, 0)",

        noteItem_background: "rgb(255, 255, 255)",
        noteItem_color: "rgb(0, 0, 0)",
        noteItem_selected_background: "rgb(0, 128, 128)",
        noteItem_selected_color: "rgb(90, 90, 90)",

        listItem_background: "transparent",
        listItem_color: "rgb(0, 0, 0)",

        modal_background: "rgb(255, 255, 255)",
        modal_color: "rgb(0, 0, 0)",

        modalButton_background: "transparent",
        modalButton_color: "rgb(0, 0, 0)",

        input_background: "rgb(230, 230, 230)",
        input_color: "rgb(0, 0, 0)",
        input_placeholder: "rgb(100, 100, 100)",
        input_unfocus_border: "rgb(170, 170, 170)",
        input_focus_border: "rgb(0, 128, 128)",
        input_selection: "rgb(0, 200, 200)",

        showPasswordButton_background: "transparent",
        showPasswordButton_color: "rgb(0, 0, 0)",

        openNoteButton_background: "rgb(0, 128, 128)",
        openNoteButton_color: "rgb(255, 255, 255)",

        radioButton_checked_color: "rgb(0, 128, 128)",
        radioButton_unchecked_color: "rgb(0, 0, 0)",

        checkButton_checked_color: "rgb(0, 128, 128)",
        checkButton_unchecked_color: "rgb(0, 0, 0)",
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
        noteItem_selected_background: "rgb(32, 180, 180)",
        noteItem_selected_color: "rgb(180, 180, 180)",

        listItem_background: "transparent",
        listItem_color: "rgb(255, 255, 255)",

        modal_background: "rgb(35, 35, 35)",
        modal_color: "rgb(255, 255, 255)",

        modalButton_background: "transparent",
        modalButton_color: "rgb(255, 255, 255)",

        input_background: "rgb(30, 30, 30)",
        input_color: "rgb(220, 220, 220)",
        input_placeholder: "rgb(150, 150, 150)",
        input_unfocus_border: "rgb(80, 80, 80)",
        input_focus_border: "rgb(32, 180, 180)",
        input_selection: "rgb(0, 128, 128)",

        showPasswordButton_background: "rgb(30, 30, 30)",
        showPasswordButton_color: "rgb(255, 255, 255)",

        openNoteButton_background: "rgb(30, 30, 30)",
        openNoteButton_color: "rgb(255, 255, 255)",

        radioButton_checked_color: "rgb(32, 180, 180)",
        radioButton_unchecked_color: "rgb(255, 255, 255)",

        checkButton_checked_color: "rgb(32, 180, 180)",
        checkButton_unchecked_color: "rgb(255, 255, 255)",
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
