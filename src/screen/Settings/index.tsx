import React, { useState } from "react"
import { useNavigation } from "@react-navigation/core"

import { SettingsHeader } from "./Header"
import { TextVersion, ViewVersion } from "./style"
import { appName, appType, appVersion } from "../../service/constant"
import { ChangeTheme } from "./ChangeTheme"
import { useBackHandler } from "../../service/hook"
import { ListItem, SafeScreen } from "../../component"
import { SettingsDatabase } from "../../database"


export function Settings() {


    const navigation = useNavigation()

    const [isChangeThemeVisible, setIsChangeThemeVisible] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })


    function goBack() {
        navigation.navigate("Home")
    }

    async function changeAppPassword() {
        const lockType = await SettingsDatabase.getSettingKey("lockType")
        if (lockType === "none") {
            navigation.navigate("ChoosePasswordType")
            return
        }
        navigation.navigate("Lock", {
            action: "change-lock",
            passwordType: lockType,
        })
    }


    return (
        <SafeScreen>
            <ChangeTheme
                visible={isChangeThemeVisible}
                setVisible={setIsChangeThemeVisible}
            />

            <SettingsHeader
                goBack={goBack}
            />

            <ListItem
                icon={"brightness-medium"}
                title={"Tema"}
                description={"Mudar tema de cores do aplicativo"}
                onPress={() => setIsChangeThemeVisible(true)}
            />

            <ListItem
                icon={"password"}
                title={"Senha"}
                description={"Adicionar/mudar senha do aplicativo"}
                onPress={changeAppPassword}
            />

            <ViewVersion>
                <TextVersion>
                    {appName} - {appVersion} - {appType}
                </TextVersion>
            </ViewVersion>
        </SafeScreen>
    )
}
