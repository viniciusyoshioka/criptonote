import React, { createRef, useCallback, useState } from "react"
import { Alert, TextInput } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"

import { FileEncryptionHeader } from "./Header"
import { ScreenParams } from "../../service/screen-params"
import { useBackHandler, useKeyboard } from "../../service/hook"
import { CheckButton, Input, InputPassword, SafeScreen, SpaceScreen } from "../../component"
import { decryptFileService, encryptFileService, EncryptionServiceOptions } from "../../service/crypto"
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
        const options: EncryptionServiceOptions = {
            deleteOriginalFile: deleteOriginalFile
        }

        encryptFileService(params.filePath, fileOutputPath, password, options)
        navigation.navigate("Home")
    }, [fileName, deleteOriginalFile, password])

    const decryptFile = useCallback(() => {
        const fileOutputPath = `${fullPathDecrypted}/${fileName}`
        const options: EncryptionServiceOptions = {
            deleteOriginalFile: deleteOriginalFile
        }

        decryptFileService(params.filePath, fileOutputPath, password, options)
        navigation.navigate("Home")
    }, [fileName, deleteOriginalFile, password])


    return (
        <SafeScreen>
            <FileEncryptionHeader
                goBack={goBack}
                encryptFile={encryptFile}
                decryptFile={decryptFile}
                cancel={cancel}
            />

            <SpaceScreen>
                <Input
                    onChangeText={(newText: string) => setFileName(newText)}
                    onSubmitEditing={() => inputPasswordRef.current?.focus()}
                    placeholder={"Nome do arquivo"}
                    ref={inputFileNameRef}
                    returnKeyType={"next"}
                    value={fileName}
                    style={{ marginBottom: 8 }}
                />

                <InputPassword
                    onChangeText={(newText: string) => setPassword(newText)}
                    onSubmitEditing={() => inputPasswordRef.current?.blur()}
                    ref={inputPasswordRef}
                    returnKeyType={"done"}
                    value={password}
                />

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
