import React from "react"
import { Alert, Keyboard, ToastAndroid, TouchableWithoutFeedback } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { useBackHandler } from "../../service/hook"
import { sha256 } from "../../service/message-digest"
import { ScreenParams } from "../../service/screen-params"
import { AddPasswordHeader } from "./Header"
import { AddBio, AddPin, AddText, SafeScreen } from "../../component"
import { SettingsDatabase } from "../../database"
import { log } from "../../service/log"


export function AddPassword() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "AddPassword">>()


    useBackHandler(() => {
        goBack()
        return true
    })


    function goBack() {
        navigation.navigate("ChoosePasswordType")
    }

    async function onDone(newLock?: string) {
        if (params.passwordType === "bio") {
            try {
                await SettingsDatabase.updateSettings("lockType", "bio")
                await SettingsDatabase.updateSettings("appLock", "")
            } catch (error) {
                log.error(`Error settings new password type into database: "${error}"`)
                Alert.alert(
                    "Aviso",
                    "Erro definindo nova senha"
                )
                return
            }
            navigation.navigate("Home")
            ToastAndroid.show("Senha adicionada", ToastAndroid.LONG)
            return
        }

        if (newLock === "" || newLock === undefined) {
            Alert.alert(
                "Aviso",
                "A senha não pode ser vazia"
            )
            return
        }

        try {
            await SettingsDatabase.updateSettings("lockType", params.passwordType)
            const hashLock = sha256(newLock)
            await SettingsDatabase.updateSettings("appLock", hashLock)
        } catch (error) {
            log.error(`Error settings new password and password type into database: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro definindo nova senha"
            )
            return
        }
        navigation.navigate("Home")
        ToastAndroid.show("Senha adicionada", ToastAndroid.LONG)
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeScreen>
                <AddPasswordHeader
                    goBack={goBack}
                />

                {params.passwordType === "pin" && (
                    <AddPin
                        onDone={onDone}
                    />
                )}

                {params.passwordType === "text" && (
                    <AddText
                        onDone={onDone}
                    />
                )}

                {params.passwordType === "bio" && (
                    <AddBio
                        onDone={onDone}
                    />
                )}
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
