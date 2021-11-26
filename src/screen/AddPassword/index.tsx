import React, { useCallback } from "react"
import { Alert, Keyboard, ToastAndroid, TouchableWithoutFeedback } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { useBackHandler } from "../../service/hook"
import { sha256 } from "../../service/message-digest"
import { ScreenParams } from "../../service/screen-params"
import { AddPasswordHeader } from "./Header"
import { AddBio, AddPin, AddText, SafeScreen } from "../../component"
import { SettingsDatabase, useDatabase } from "../../database"


export function AddPassword() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "AddPassword">>()

    const db = useDatabase()


    useBackHandler(() => {
        goBack()
        return true
    })


    const goBack = useCallback(() => {
        navigation.navigate("ChoosePasswordType")
    }, [])

    const onDone = useCallback(async (newLock?: string) => {
        if (params.passwordType === "bio") {
            await SettingsDatabase.updateSettings(db, "lockType", "bio")
            await SettingsDatabase.updateSettings(db, "appLock", "")
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

        await SettingsDatabase.updateSettings(db, "lockType", params.passwordType)
        const hashLock = sha256(newLock)
        await SettingsDatabase.updateSettings(db, "appLock", hashLock)
        navigation.navigate("Home")
        ToastAndroid.show("Senha adicionada", ToastAndroid.LONG)
    }, [])


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
