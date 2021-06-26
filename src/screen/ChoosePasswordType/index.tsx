import React, { useCallback, useEffect, useState } from "react"
import { Alert, ToastAndroid } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as ExpoAuth from "expo-local-authentication"

import { SafeScreen } from "../../component/Screen"
import { SettingsButton } from "../../component/SettingsButton"
import { useBackHandler } from "../../service/hook"
import { readLockType, writeLock, writeLockType } from "../../service/storage"
import { ChoosePasswordTypeHeader } from "./Header"


export function ChoosePasswordType() {


    const navigation = useNavigation()

    const [hasBioSupport, setHasBioSupport] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })


    const goBack = useCallback(() => {
        navigation.navigate("Settings")
    }, [])

    const removeLock = useCallback(async () => {
        const currentLockType = await readLockType()
        if (currentLockType === "none") {
            ToastAndroid.show("Aplicativo já está sem senha", ToastAndroid.LONG)
            return
        }

        await writeLockType("none")
        await writeLock("")
        navigation.navigate("Home")
        ToastAndroid.show("Senha removida", ToastAndroid.LONG)
    }, [])

    const addBioLock = useCallback(async () => {
        const currentDeviceLock = await ExpoAuth.getEnrolledLevelAsync()
        if (currentDeviceLock === ExpoAuth.SecurityLevel.BIOMETRIC) {
            await writeLock("")
            await writeLockType("bio")
            navigation.navigate("Home")
            ToastAndroid.show("Senha adicionada", ToastAndroid.LONG)
            return
        }

        Alert.alert(
            "Aviso",
            "Adicione a biometria no dispositivo para habilitá-lo no aplicativo"
        )
    }, [])


    useEffect(() => {
        async function getSupportBio() {
            const isBioSupported = await ExpoAuth.hasHardwareAsync()
            setHasBioSupport(isBioSupported)
        }

        getSupportBio()
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

            {/* TODO */}
            {(hasBioSupport || true) && (
                <SettingsButton
                    iconName={"fingerprint"}
                    title={"Biometria"}
                    description={"Segurança muito alta"}
                    onPress={addBioLock}
                />
            )}
        </SafeScreen>
    )
}
