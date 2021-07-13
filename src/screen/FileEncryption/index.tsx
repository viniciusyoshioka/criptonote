import React, { createRef, useCallback, useState } from "react"
import { Alert, TextInput } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"

import { FileEncryptionHeader } from "./Header"
import { InputFileName } from "./style"
import { ScreenParams } from "../../service/screen-params"
import { useBackHandler, useKeyboard } from "../../service/hook"
import { CheckButton, InputPassword, SafeScreen, SpaceScreen } from "../../component"
import { decryptFileService, encryptFileService } from "../../service/crypto"
import { fullPathDecrypted, fullPathEncrypted } from "../../service/constant"


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
    // const [deleteOriginalFile, setDeleteOriginalFile] = useState(false)


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

    const cancel = useCallback(() => {
        Alert.alert(
            "Aviso",
            "A encriptação do arquivo será cancelada",
            [
                { text: "Cancelar", onPress: () => { } },
                { text: "Ok", onPress: () => navigation.navigate("Home") },
            ]
        )
    }, [])

    const encryptFile = useCallback(() => {
        const fileOutputPath = `${fullPathEncrypted}/${fileName}`
        encryptFileService(params.filePath, fileOutputPath, password)
        navigation.navigate("Home")
    }, [password])

    const decryptFile = useCallback(() => {
        const fileOutputPath = `${fullPathDecrypted}/${fileName}`
        decryptFileService(params.filePath, fileOutputPath, password)
        navigation.navigate("Home")
    }, [password])


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

                <InputPassword
                    onChangeText={(newText: string) => setPassword(newText)}
                    onSubmitEditing={() => inputPasswordRef.current?.blur()}
                    ref={inputPasswordRef}
                    returnKeyType={"done"}
                    value={password}
                />

                {/* TODO */}
                {/* <CheckButton
                    text={"Apagar arquivo original"}
                    value={deleteOriginalFile}
                    onPress={() => setDeleteOriginalFile(!deleteOriginalFile)}
                    onValueChange={() => setDeleteOriginalFile(!deleteOriginalFile)}
                /> */}
            </SpaceScreen>
        </SafeScreen>
    )
}
