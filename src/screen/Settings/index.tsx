import React, { useState } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { SettingsHeader } from "./Header"
import { TextVersion, ViewVersion } from "./style"
import { appName, appType, appVersion } from "../../service/constant"
import { ChangeTheme } from "./ChangeTheme"
import { useBackHandler } from "../../service/hook"
import { ListItem, SafeScreen } from "../../component"
import { SettingsDatabase } from "../../database"
import { log } from "../../service/log"


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
        try {
            const lockType = await SettingsDatabase.getSettingKey("lockType")
            if (lockType === "none") {
                navigation.navigate("ChoosePasswordType")
                return
            }
            navigation.navigate("Lock", {
                action: "change-lock",
                passwordType: lockType,
            })
        } catch (error) {
            log.error(`Error getting lockType setting from database to changeAppPassword: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro ao verificar tipo de senha em uso"
            )
        }
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
