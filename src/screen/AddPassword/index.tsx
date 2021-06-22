import React, { useCallback } from "react"
import { Keyboard, ToastAndroid, TouchableWithoutFeedback } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { AddBio } from "../../component/AddBio"
import { AddPin } from "../../component/AddPin"
import { AddText } from "../../component/AddText"
import { SafeScreen } from "../../component/Screen"
import { useBackHandler } from "../../service/hook"
import { sha256 } from "../../service/message-digest"
import { ScreenParams } from "../../service/screen-params"
import { writeLock, writeLockType } from "../../service/storage"
import { AddPasswordHeader } from "./Header"


export function AddPassword() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "AddPassword">>()


    useBackHandler(() => {
        goBack()
        return true
    })


    const goBack = useCallback(() => {
        navigation.navigate("ChoosePasswordType")
    }, [])

    const onDone = useCallback(async (newLock: string) => {
        await writeLockType(params.passwordType)
        const hashLock = sha256(newLock)
        await writeLock(hashLock)
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
                    <AddBio />
                )}
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
