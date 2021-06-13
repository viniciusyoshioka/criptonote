import React, { useCallback, useState } from "react"
import { useNavigation } from "@react-navigation/core"

import { SafeScreen } from "../../component/Screen"
import { SettingsHeader } from "./Header"
import { TextVersion, ViewVersion } from "./style"
import { appFName, appType, appVersion } from "../../service/constant"
import { SettingsButton } from "../../component/SettingsButton"
import { ChangeTheme } from "./ChangeTheme"
import { useBackHandler } from "../../service/hook"


export function Settings() {


    const navigation = useNavigation()

    const [isChangeThemeVisible, setIsChangeThemeVisible] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })


    const goBack = useCallback(() => {
        navigation.navigate("Home")
    }, [])


    return (
        <SafeScreen>
            <ChangeTheme
                visible={isChangeThemeVisible}
                setVisible={setIsChangeThemeVisible}
            />

            <SettingsHeader
                goBack={goBack}
            />

            <SettingsButton
                iconName={"md-contrast"}
                title={"Tema"}
                description={"Mudar tema de cores do aplicativo"}
                onPress={() => setIsChangeThemeVisible(true)}
            />

            <SettingsButton
                iconName={"md-lock-closed"}
                title={"Senha"}
                description={"Adicionar/mudar senha do aplicativo"}
                onPress={() => {}}
            />

            <ViewVersion>
                <TextVersion>
                    {appFName} - {appVersion} - {appType}
                </TextVersion>
            </ViewVersion>
        </SafeScreen>
    )
}
