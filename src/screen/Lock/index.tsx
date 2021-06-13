import React, { createRef, useState } from "react"
import { Alert, TextInput, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { AppName, PasswordInput } from "./style"
import { SafeScreen } from "../../component/Screen"
import { useKeyboard } from "../../service/hook"
import { readLock } from "../../service/storage"
import { sha256 } from "../../service/message-digest"


export function Lock() {


    const navigation = useNavigation()

    const inputLockRef = createRef<TextInput>()

    const [lock, setLock] = useState("")


    useKeyboard("keyboardDidHide", () => {
        if (inputLockRef.current?.isFocused()) {
            inputLockRef.current.blur()
        }
    })


    async function unlock() {
        const appLock = await readLock()

        const hashLock = sha256(lock)

        if (hashLock === appLock) {
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


    return (
        <SafeScreen style={{alignItems: "center", justifyContent: "flex-start"}}>
            <AppName>
                CriptoNote
            </AppName>

            <PasswordInput
                style={{width: useWindowDimensions().width / 2}}
                autoCapitalize={"none"}
                autoCompleteType={"off"}
                autoCorrect={false}
                autoFocus={true}
                keyboardType={"numeric"}
                onChangeText={(newText: string) => setLock(newText)}
                onSubmitEditing={unlock}
                placeholder={"Senha"}
                ref={inputLockRef}
                secureTextEntry={true}
                textAlign={"center"}
                value={lock}
            />
        </SafeScreen>
    )
}