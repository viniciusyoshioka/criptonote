import React, { memo } from "react"
import { Alert, View } from "react-native"
import RNFS from "react-native-fs"
import Share from "react-native-share"

import { DebugButton } from "../../component"
import { fullPathLog, fullPathRoot } from "../../service/constant"
import { useSwitchTheme } from "../../service/theme"
import { testFile, testString } from "../../service/crypto"


export interface DebugHomeProps {
    debugReadNote: () => void,
    debugWriteNote: () => void,
    debugClearNote: () => void,
}


export const DebugHome = memo((props: DebugHomeProps) => {


    const switchTheme = useSwitchTheme()


    async function debugReadLog() {
        try {
            if (await RNFS.exists(fullPathLog)) {
                RNFS.readFile(`${fullPathRoot}/docscanlog.log`)
                    .then((logContent) => {
                        console.log(`Arquivo de Log: "${logContent}"`)
                    })
                return
            }

            Alert.alert(
                "INFO",
                "Não há arquivo de log para ler",
                [{ text: "Ok", onPress: () => { } }],
                { cancelable: false }
            )
        } catch (error) {
            console.log(`FALHA MODERADA - Erro ao ler arquivo de log. Mensagem: "${error}"`)
            Alert.alert(
                "FALHA MODERADA",
                `Erro ao ler arquivo de log. Mensagem: "${error}"`,
                [{ text: "Ok", onPress: () => { } }],
                { cancelable: false }
            )
        }
    }

    async function debugShareLog() {
        try {
            if (await RNFS.exists(fullPathLog)) {
                if (__DEV__) {
                    await Share.open({
                        title: "Compartilhar log",
                        type: "text/plain",
                        url: `file://${fullPathRoot}/docscanlog.log`,
                        failOnCancel: false
                    })
                    return
                }

                Alert.alert(
                    "ERRO",
                    "Não é possível compartilhar arquivo de log na versão release"
                )
                return
            }

            Alert.alert(
                "INFO",
                "Não há arquivo de log para compartilhar",
                [{ text: "Ok", onPress: () => { } }],
                { cancelable: false }
            )
        } catch (error) {
            console.log(`FALHA MODERADA - Erro ao compartilhar arquivo de log. Mensagem: "${error}"`)
            Alert.alert(
                "FALHA MODERADA",
                `Erro ao compartilhar arquivo de log. Mensagem: "${error}"`,
                [{ text: "Ok", onPress: () => { } }],
                { cancelable: false }
            )
        }
    }

    async function debugDeleteLog() {
        async function alertDeleteLogComplete() {
            if (!await RNFS.exists(fullPathLog)) {
                Alert.alert(
                    "INFO",
                    "Não há arquivo de log para apagar"
                )
                return
            }

            try {
                await RNFS.unlink(fullPathLog)
                Alert.alert(
                    "INFO",
                    "Arquivo de log apagado com sucesso",
                    [{ text: "Ok", onPress: () => { } }],
                    { cancelable: false }
                )
            } catch (error) {
                Alert.alert(
                    "FALHA MODERADA",
                    "Erro ao apagar arquivo de log",
                    [{ text: "Ok", onPress: () => { } }],
                    { cancelable: false }
                )
            }
        }

        Alert.alert(
            "AVISO",
            "Apagar arquivo de log?",
            [
                { text: "Cancelar", onPress: () => { } },
                { text: "Ok", onPress: async () => await alertDeleteLogComplete() }
            ],
            { cancelable: false }
        )
    }

    async function debugReadAppFolder() {
        console.log("readAppFolder")

        console.log("========== appCacheDir ==========")
        if (await RNFS.exists(RNFS.CachesDirectoryPath)) {
            const cacheDirContent = await RNFS.readDir(RNFS.CachesDirectoryPath)
            cacheDirContent.forEach(async (item) => {
                console.log(item.path)
            })
            if (cacheDirContent.length === 0) {
                console.log("[]")
            }
        } else {
            console.log("Não existe")
        }

        console.log("========== fullPathRoot ==========")
        if (await RNFS.exists(fullPathRoot)) {
            const pathRootContent = await RNFS.readDir(fullPathRoot)
            pathRootContent.forEach((item) => {
                console.log(item.path)
            })
            if (pathRootContent.length === 0) {
                console.log("[]")
            }
        } else {
            console.log("Não existe")
        }
    }

    async function debugTestStringEncryption() {
        const text = "TEXT de teste"
        const password = "PASSWORD de teste"
        testString(text, password)
            .then((isEqual) => {
                Alert.alert("testString", `testString ${isEqual}`)
            })
    }

    async function debugTestFileEncryption() {
        const file1 = "/storage/emulated/0/A1.jpg"
        const file2 = "/storage/emulated/0/A2.jpg"
        const file3 = "/storage/emulated/0/A3.jpg"
        const password = "s"

        testFile(file1, password)
            .then(async ({ encryptedFilePath, decryptedFilePath }) => {
                await RNFS.moveFile(encryptedFilePath, file2)
                await RNFS.moveFile(decryptedFilePath, file3)
                Alert.alert("testFile", "testFile acabou")
            })
    }


    return (
        <View>
            <DebugButton
                text={"Ler"}
                onPress={props.debugReadNote}
                style={{ bottom: 115 }} />
            <DebugButton
                text={"Escre"}
                onPress={props.debugWriteNote}
                style={{ bottom: 60 }} />
            <DebugButton
                text={"Limpar"}
                onPress={props.debugClearNote}
                style={{ bottom: 5 }} />

            <DebugButton
                text={"Auto"}
                onPress={async () => await switchTheme("auto")}
                style={{ bottom: 115, left: 60 }} />
            <DebugButton
                text={"Claro"}
                onPress={async () => await switchTheme("light")}
                style={{ bottom: 60, left: 60 }} />
            <DebugButton
                text={"Escuro"}
                onPress={async () => await switchTheme("dark")}
                style={{ bottom: 5, left: 60 }} />

            <DebugButton
                text={"Ler"}
                onPress={debugReadLog}
                style={{ bottom: 115, left: 115 }} />
            <DebugButton
                text={"Compar"}
                onPress={debugShareLog}
                style={{ bottom: 60, left: 115 }} />
            <DebugButton
                text={"Apagar"}
                onPress={debugDeleteLog}
                style={{ bottom: 5, left: 115 }}
            />

            <DebugButton
                text={"Ler"}
                onPress={debugReadAppFolder}
                style={{ bottom: 5, left: 170 }} />

            <DebugButton
                text={"String"}
                onPress={debugTestStringEncryption}
                style={{ bottom: 60, left: 225 }} />
            <DebugButton
                text={"Arquivo"}
                onPress={debugTestFileEncryption}
                style={{ bottom: 5, left: 225 }} />
        </View>
    )
})
