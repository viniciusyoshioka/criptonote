import React, { createRef, useEffect, useState } from "react"
import { Alert, TextInput } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"

import { AppName } from "./style"
import { useBackHandler, useKeyboard } from "../../service/hook"
import { sha256 } from "../../service/message-digest"
import { lockType } from "../../service/object-type"
import { ScreenParams } from "../../service/screen-params"
import { AddBio, AddPin, AddText, SafeScreen } from "../../component"
import { SettingsDatabase } from "../../database"
import { log } from "../../service/log"


export function Lock() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "Lock">>()

    const inputLockRef = createRef<TextInput>()

    const [appLockType, setAppLockType] = useState<lockType | null>(null)


    useBackHandler(() => {
        if (params?.action === "change-lock") {
            navigation.navigate("Settings")
            return true
        }
        return false
    })

    useKeyboard("keyboardDidHide", () => {
        if (inputLockRef.current?.isFocused()) {
            inputLockRef.current.blur()
        }
    })


    async function unlock(lock: string) {
        let appLock
        try {
            appLock = await SettingsDatabase.getSettingKey("appLock")
        } catch (error) {
            log.error(`Error getting app hashed password to unlock the app: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro ao tentar desbloquear aplicativo"
            )
            return
        }

        const hashLock = sha256(lock)

        if (hashLock === appLock) {
            if (params?.action === "change-lock") {
                navigation.reset({
                    routes: [
                        { name: "Home" },
                        { name: "Settings" },
                        { name: "ChoosePasswordType" },
                    ]
                })
                return
            }

            navigation.reset({
                routes: [
                    { name: "Home" }
                ]
            })
            return
        }

        Alert.alert(
            "Alerta",
            "Senha inválida"
        )
    }

    async function unlockBio() {
        if (params?.action === "change-lock") {
            navigation.reset({
                routes: [
                    { name: "Home" },
                    { name: "Settings" },
                    { name: "ChoosePasswordType" },
                ]
            })
            return
        }

        navigation.reset({
            routes: [
                { name: "Home" }
            ]
        })
        return
    }


    useEffect(() => {
        async function isProtected() {
            let readAppLockType
            try {
                readAppLockType = await SettingsDatabase.getSettingKey("lockType")
            } catch (error) {
                log.error(`Erro getting lock type in use to check for lock screen: "${error}"`)
                Alert.alert(
                    "Aviso",
                    "Erro ao verificar se o aplicativo possui bloqueio de tela"
                )
                return
            }

            if (readAppLockType === "none") {
                navigation.reset({
                    routes: [
                        { name: "Home" }
                    ]
                })
                return
            }

            setAppLockType(readAppLockType)
            inputLockRef.current?.focus()
        }

        isProtected()
    }, [])


    if (appLockType === null) {
        return null
    }


    return (
        <SafeScreen style={{ justifyContent: "center" }}>
            <AppName>
                CriptoNote
            </AppName>

            {(appLockType === "pin") && (
                <AddPin
                    onDone={unlock}
                    style={{ marginTop: -100 }}
                />
            )}

            {(appLockType === "text") && (
                <AddText
                    onDone={unlock}
                    style={{ marginTop: -100 }}
                />
            )}

            {(appLockType === "bio") && (
                <AddBio
                    onDone={unlockBio}
                    style={{ marginTop: -100 }}
                />
            )}
        </SafeScreen>
    )
}
