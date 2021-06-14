import React, { createRef, useCallback, useState } from "react"
import { Alert, TextInput } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"

import { FileEncryptionHeader } from "./Header"
import { InputFileName } from "./style"
import { SafeScreen, SpaceScreen } from "../../component/Screen"
import { ScreenParams } from "../../service/screen-params"
import { useBackHandler, useKeyboard } from "../../service/hook"
import { InputPassword, ShowPasswordButton, ViewInputPassword } from "../../component/InputPassword"
import { CheckButton } from "../../component/CheckButton"


function getFileName(filePath: string): string {
    const splitedPath = filePath.split("/")
    return splitedPath[splitedPath.length - 1]
}


export function FileEncryption() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "FileEncryption">>()

    const inputFileNameRef = createRef<TextInput>()
    const inputPasswordRef = createRef<TextInput>()

    const [fileName, setFileName] = useState(getFileName(params.filePath))
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [deleteOriginalFile, setDeleteOriginalFile] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })

    useKeyboard("keyboardDidHide", () => {
        if (inputFileNameRef.current?.isFocused()) {
            inputFileNameRef.current.blur()
            return
        }

        if (inputPasswordRef.current?.isFocused()) {
            inputPasswordRef.current.blur()
            return
        }
    })


    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])

    const encryptFile = useCallback(() => {
        // TODO
    }, [])

    const decryptFile = useCallback(() => {
        // TODO
    }, [])

    const cancel = useCallback(() => {
        Alert.alert(
            "Aviso",
            "A encriptação do arquivo será cancelada",
            [
                {text: "Cancelar", onPress: () => {}},
                {text: "Ok", onPress: () => navigation.navigate("Home")},
            ]
        )
    }, [])


    return (
        <SafeScreen>
            <FileEncryptionHeader
                goBack={goBack}
                encryptFile={encryptFile}
                decryptFile={decryptFile}
                cancel={cancel}
            />

            <SpaceScreen>
                <InputFileName
                    onChangeText={(newText: string) => setFileName(newText)}
                    onSubmitEditing={() => inputPasswordRef.current?.focus()}
                    placeholder={"Nome do arquivo"}
                    ref={inputFileNameRef}
                    returnKeyType={"next"}
                    value={fileName}
                />

                <ViewInputPassword>
                    <InputPassword
                        onChangeText={(newText: string) => setPassword(newText)}
                        onSubmitEditing={() => inputPasswordRef.current?.blur()}
                        ref={inputPasswordRef}
                        returnKeyType={"done"}
                        showPassword={showPassword}
                        value={password}
                    />

                    <ShowPasswordButton
                        showPassword={showPassword}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                </ViewInputPassword>

                <CheckButton
                    text={"Apagar arquivo original"}
                    value={deleteOriginalFile}
                    onPress={() => setDeleteOriginalFile(!deleteOriginalFile)}
                    onValueChange={() => setDeleteOriginalFile(!deleteOriginalFile)}
                />
            </SpaceScreen>
        </SafeScreen>
    )
}
