import { ThemeType as ElementiumThemeType } from "@elementium/native"


export type ThemeType = "auto" | "light" | "dark"


export interface AppThemeType extends ElementiumThemeType {
    appTheme: ThemeType;
    switchTheme: (newTheme: ThemeType) => void;
}


export interface StyledProps {
    theme: AppThemeType;
}
