import React, { useCallback } from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { AddPasswordHeader } from "./Header"
import { AddPin } from "../../component/AddPin"
import { AddText } from "../../component/AddText"
import { AddBio } from "../../component/AddBio"
import { SafeScreen } from "../../component/Screen"
import { useBackHandler } from "../../service/hook"
import { ScreenParams } from "../../service/screen-params"
import { writeLock, writeLockType } from "../../service/storage"
import { sha256 } from "../../service/message-digest"


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
        console.log("newLock", `"${newLock}"`)
        console.log("hashLock", `"${hashLock}"`)
        await writeLock(hashLock)
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
