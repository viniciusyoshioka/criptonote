/* eslint-disable camelcase */
import { I18n } from "i18n-js"
import { NativeModules, Platform } from "react-native"

import { pt_BR } from "./pt_BR"
import { TranslationKeyType } from "./types"


export * from "./types"


type LanguageCodeNormalization = {
    [key in string]: string;
}

const normalizedLanguageCode: LanguageCodeNormalization = {
    "en": "en_US",
    "en_US": "en_US",
    "pt_BR": "pt_BR",
    "pt_US": "pt_BR",
}


export const i18n = new I18n({
    "pt_BR": pt_BR,
})


function getDeviceLanguage(): string {
    switch (Platform.OS) {
        case "android":
            return normalizedLanguageCode[NativeModules.I18nManager.localeIdentifier as string]
        case "ios":
            return normalizedLanguageCode[NativeModules.SettingsManager.settings.AppleLocale as string]
        default:
            throw new Error("Only Android and iOS are supported.")
    }
}


function setLanguageToI18n() {
    const deviceLanguage = getDeviceLanguage()
    const allSupportedLanguages = Object.keys(i18n.translations)

    const isLanguageSupported = allSupportedLanguages.includes(deviceLanguage)
    isLanguageSupported
        ? i18n.locale = deviceLanguage
        : i18n.defaultLocale = "en_US"
}


setLanguageToI18n()


export const translate = (key: TranslationKeyType): string => i18n.t(key)
