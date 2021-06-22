import React, { createRef, useEffect, useState } from "react"
import { Alert, TextInput } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"

import { AppName } from "./style"
import { SafeScreen } from "../../component/Screen"
import { useBackHandler, useKeyboard } from "../../service/hook"
import { readLock, readLockType } from "../../service/storage"
import { sha256 } from "../../service/message-digest"
import { lockType } from "../../service/object-type"
import { AddText } from "../../component/AddText"
import { AddPin } from "../../component/AddPin"
import { AddBio } from "../../component/AddBio"
import { ScreenParams } from "../../service/screen-params"


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
        const appLock = await readLock()
        const hashLock = sha256(lock)

        if (hashLock === appLock) {
            if (params?.action === "change-lock") {
                navigation.reset({routes: [
                    {name: "Home"},
                    {name: "Settings"},
                    {name: "ChoosePasswordType"},
                ]})
                return
            }

            navigation.reset({routes: [
                {name: "Home"}
            ]})
            return
        }

        Alert.alert(
            "Alerta",
            "Senha inválida"
        )
    }


    useEffect(() => {
        async function isProtected() {
            const readAppLockType = await readLockType()
            if (readAppLockType === "none") {
                navigation.reset({routes: [
                    {name: "Home"}
                ]})
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
        <SafeScreen style={{justifyContent: "center"}}>
            <AppName>
                CriptoNote
            </AppName>

            {(appLockType === "pin") && (
                <AddPin
                    onDone={unlock}
                    style={{marginTop: -100}}
                />
            )}

            {(appLockType === "text") && (
                <AddText
                    onDone={unlock}
                    style={{marginTop: -100}}
                />
            )}

            {(appLockType === "bio") && (
                <AddBio
                    style={{marginTop: -100}}
                />
            )}
        </SafeScreen>
    )
}
