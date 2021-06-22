import React, { useCallback } from "react"
import { ToastAndroid } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { SafeScreen } from "../../component/Screen"
import { SettingsButton } from "../../component/SettingsButton"
import { useBackHandler } from "../../service/hook"
import { writeLock, writeLockType } from "../../service/storage"
import { ChoosePasswordTypeHeader } from "./Header"


export function ChoosePasswordType() {


    const navigation = useNavigation()


    useBackHandler(() => {
        goBack()
        return true
    })


    const goBack = useCallback(() => {
        navigation.navigate("Settings")
    }, [])

    const removeLock = useCallback(async () => {
        await writeLockType("none")
        await writeLock("")
        navigation.navigate("Home")
        ToastAndroid.show("Senha removida", ToastAndroid.LONG)
    }, [])


    return (
        <SafeScreen>
            <ChoosePasswordTypeHeader
                goBack={goBack}
            />

            <SettingsButton
                iconName={"remove-circle-outline"}
                title={"Nenhuma"}
                description={"Nenhuma segurança"}
                onPress={removeLock}
            />

            <SettingsButton
                iconName={"pin"}
                title={"PIN"}
                description={"Segurança média para alta"}
                onPress={() => navigation.navigate("AddPassword", {passwordType: "pin"})}
            />

            <SettingsButton
                iconName={"password"}
                title={"Senha"}
                description={"Segurança alta"}
                onPress={() => navigation.navigate("AddPassword", {passwordType: "text"})}
            />

            <SettingsButton
                iconName={"fingerprint"}
                title={"Digital"}
                description={"Segurança muito alta"}
                onPress={() => navigation.navigate("AddPassword", {passwordType: "bio"})}
            />
        </SafeScreen>
    )
}
