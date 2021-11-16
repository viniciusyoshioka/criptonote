import { Alert, ToastAndroid } from "react-native"
import RNFS from "react-native-fs"

import { fullPathLog } from "./constant"
import { getLogPermission, LogPermissionResult } from "./permission"


export type logCode = "INFO" | "WARN" | "ERROR"


async function createLogFile(): Promise<void> {
    const fileExists = await RNFS.exists(fullPathLog)

    if (!fileExists) {
        try {
            await RNFS.writeFile(fullPathLog, "")
        } catch (error) {
            console.log(`FALHA CRÍTICA - Erro criando arquivo de log. Mensagem: "${error}"`)
            Alert.alert(
                "FALHA CRÍTICA",
                `Erro criando arquivo de log. Mensagem: "${error}"`
            )
        }
    }
}


export function log(code: logCode, data: string) {
    if (!__DEV__) {
        return
    }

    getLogPermission()
        .then((logPermission: LogPermissionResult) => {
            if (!logPermission.READ_EXTERNAL_STORAGE || !logPermission.WRITE_EXTERNAL_STORAGE) {
                ToastAndroid.show("Permissão negada para registrar logs", 10)
                return false
            }
            return true
        })
        .then(async (hasPermission: boolean) => {
            if (!hasPermission) {
                return false
            }
            await createLogFile()
            return true
        })
        .then(async (hasPermission: boolean) => {
            if (!hasPermission) {
                return false
            }
            console.log(`${code} - ${data}`)
            try {
                await RNFS.appendFile(fullPathLog, `${code} - ${data}\n`)
                return true
            } catch (error) {
                console.log(`FALHA CRÍTICA - Erro registrando log. Mensagem: "${error}"`)
                Alert.alert(
                    "FALHA CRÍTICA",
                    `Erro registrando log. Mensagem: "${error}"`
                )
                return false
            }
        })
}
