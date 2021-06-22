import React from "react"
import { useCallback } from "react"
import { useNavigation } from "@react-navigation/native"

import { ChoosePasswordTypeHeader } from "./Header"
import { SafeScreen } from "../../component/Screen"
import { SettingsButton } from "../../component/SettingsButton"
import { useBackHandler } from "../../service/hook"


export function ChoosePasswordType() {


    const navigation = useNavigation()


    useBackHandler(() => {
        goBack()
        return true
    })


    const goBack = useCallback(() => {
        navigation.navigate("Settings")
    }, [])


    return (
        <SafeScreen>
            <ChoosePasswordTypeHeader
                goBack={goBack}
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
