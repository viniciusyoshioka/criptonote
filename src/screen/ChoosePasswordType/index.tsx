import React, { useEffect, useState } from "react"
import { Alert, ToastAndroid } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useBackHandler } from "../../service/hook"
import { ChoosePasswordTypeHeader } from "./Header"
import { ListItem, SafeScreen } from "../../component"
import { SettingsDatabase } from "../../database"
import { log } from "../../service/log"


export function ChoosePasswordType() {


    const navigation = useNavigation()

    const [hasBioSupport, setHasBioSupport] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })


    function goBack() {
        navigation.navigate("Settings")
    }

    async function removeLock() {
        let currentLockType
        try {
            currentLockType = await SettingsDatabase.getSettingKey("lockType")
        } catch (error) {
            log.error(`Error getting lock type from database: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro verificando tipo de senha em uso"
            )
            return
        }

        if (currentLockType === "none") {
            ToastAndroid.show("Aplicativo já está sem senha", ToastAndroid.LONG)
            return
        }

        try {
            await SettingsDatabase.updateSettings("lockType", "none")
            await SettingsDatabase.updateSettings("appLock", "")
        } catch (error) {
            log.error(`Error updating password and password type in database: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro removendo senha"
            )
            return
        }
        navigation.navigate("Home")
        ToastAndroid.show("Senha removida", ToastAndroid.LONG)
    }

    async function addBioLock() {
        Alert.alert(
            "Aviso",
            "Sem suporte à biometria"
        )
    }


    useEffect(() => {
        async function getSupportBio() {
            setHasBioSupport(false)
        }

        getSupportBio()
    }, [])


    return (
        <SafeScreen>
            <ChoosePasswordTypeHeader
                goBack={goBack}
            />

            <ListItem
                icon={"remove-circle-outline"}
                title={"Nenhuma"}
                description={"Nenhuma segurança"}
                onPress={removeLock}
            />

            <ListItem
                icon={"pin"}
                title={"PIN"}
                description={"Segurança média para alta"}
                onPress={() => navigation.navigate("AddPassword", { passwordType: "pin" })}
            />

            <ListItem
                icon={"password"}
                title={"Senha"}
                description={"Segurança alta"}
                onPress={() => navigation.navigate("AddPassword", { passwordType: "text" })}
            />

            {hasBioSupport && (
                <ListItem
                    icon={"fingerprint"}
                    title={"Biometria"}
                    description={"Segurança muito alta"}
                    onPress={addBioLock}
                />
            )}
        </SafeScreen>
    )
}
