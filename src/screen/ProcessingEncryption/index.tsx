import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Alert, ToastAndroid } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import RNFS from "react-native-fs"

import { CenterScreen, SafeScreen } from "../../component/Screen"
import { ScreenParams } from "../../service/screen-params"
import { useTheme } from "../../service/theme"
import { ProcessingEncryptionHeader } from "./Header"
import { MessageText } from "./style"
import { encryptFileTask, decryptFileTask, FileEncryptionTaskParams, stopFileEncryptionTask } from "../../service/crypto"
import { fullPathDecrypted, fullPathEncrypted, relativePathDecrypted, relativePathEncrypted } from "../../service/constant"
import { useBackHandler } from "../../service/hook"


export function ProcessingEncryption() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "ProcessingEncryption">>()

    const { color, opacity } = useTheme()

    const [message, setMessage] = useState("")
    const [percentage, setPercentage] = useState<string | null>(null)


    useBackHandler(() => {
        goBack()
        return true
    })


    const goBack = useCallback(() => {
        if (message === "" && percentage === null) {
            navigation.goBack()
            return
        }

        function stopAndExitAlert() {
            const stopTaskId = params.operation === "encrypt" ? 0 : 1
            stopFileEncryptionTask(stopTaskId)
            navigation.goBack()
        }

        Alert.alert(
            "Aviso",
            "Sair durante o processo de criptografia irá interrompê-lo",
            [
                {text: "Cancelar", onPress: () => {}},
                {text: "Ok", onPress: () => stopAndExitAlert()}
            ]
        )
    }, [])

    const stopEncryptionTask = useCallback(() => {
        setPercentage(null)
        switch (params.operation) {
            case "encrypt":
                setMessage("Parando criptografia")
                stopFileEncryptionTask(0)
                break
            case "decrypt":
                setMessage("Parando descriptografia")
                stopFileEncryptionTask(1)
                break
            default:
                throw new Error("Unknown value for encryption operation")
        }
    }, [])


    useEffect(() => {
        async function startEncryption() {
            if (params.operation === "encrypt") {
                const fileEncryptParams: FileEncryptionTaskParams = {
                    taskId: 0,
                    filePath: params.filePath,
                    password: params.password,
                    onProgress: (current, total) => {
                        setPercentage(Math.round((current / total) * 100).toString())
                    },
                    onComplete: async (fileOutputPath) => {
                        const fileDestinyPath = `${fullPathEncrypted}/${params.fileDestinyName}`
                        await RNFS.moveFile(fileOutputPath, fileDestinyPath)
                        navigation.navigate("Home")
                        ToastAndroid.show(`Arquivo criptografado com sucesso para "${relativePathEncrypted}/${params.fileDestinyName}"`, ToastAndroid.LONG)
                    },
                    onError: (message) => {
                        Alert.alert(
                            "Aviso",
                            `Erro ao criptografar arquivo. "${message}"`
                        )
                        navigation.navigate("Home")
                    },
                }

                setMessage("Criptografando arquivo")
                encryptFileTask(fileEncryptParams)
            } else if (params.operation === "decrypt") {
                const fileDecryptParams: FileEncryptionTaskParams = {
                    taskId: 1,
                    filePath: params.filePath,
                    password: params.password,
                    onProgress: (current, total) => {
                        setPercentage(Math.round((current / total) * 100).toString())
                    },
                    onComplete: async (fileOutputPath) => {
                        const fileDestinyPath = `${fullPathDecrypted}/${params.fileDestinyName}`
                        await RNFS.moveFile(fileOutputPath, fileDestinyPath)
                        navigation.navigate("Home")
                        ToastAndroid.show(`Arquivo criptografado com sucesso para "${relativePathDecrypted}/${params.fileDestinyName}"`, ToastAndroid.LONG)
                    },
                    onError: (message) => {
                        Alert.alert(
                            "Aviso",
                            `Erro ao descriptografar arquivo. "${message}"`
                        )
                        navigation.navigate("Home")
                    },
                }

                setMessage("Descriptografando arquivo")
                decryptFileTask(fileDecryptParams)
            }
        }

        startEncryption()
    }, [])


    return (
        <SafeScreen>
            <ProcessingEncryptionHeader
                goBack={goBack}
                stopEncryptionTask={stopEncryptionTask}
            />

            <CenterScreen>
                <ActivityIndicator
                    size={"large"}
                    color={color.screen_color}
                    style={{opacity: opacity.highEmphasis}}
                />

                <MessageText numberOfLines={1} ellipsizeMode={"middle"}>
                    {message}{percentage !== null && ` ${percentage}%`}
                </MessageText>
            </CenterScreen>
        </SafeScreen>
    )
}
