import { Screen, ScrollScreen } from "@elementium/native"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import DocumentPicker from "react-native-document-picker"
import RNFS from "react-native-fs"
import { List } from "react-native-paper"

import { useBackHandler } from "@hooks"
import { TranslationKeyType, translate } from "@locales"
import { FileCodeAction, NavigationParamProps } from "@router"
import { Constants } from "@services/constant"
import { log, stringifyError } from "@services/log"
import { ExternalStorage } from "@services/manage-external-storage"
import { useSettings } from "@services/settings"
import { FileHomeHeader } from "./Header"


type PickedFile = {
    name: string
    path: string
}


export function FileHome() {


    const navigation = useNavigation<NavigationParamProps<"FileHome">>()

    const { settings } = useSettings()


    useBackHandler(() => {
        navigation.goBack()
        return true
    })


    async function selectFile(action: FileCodeAction): Promise<PickedFile | null> {
        try {
            const response = await DocumentPicker.pickSingle({
                copyTo: "cachesDirectory",
            })

            if (response.copyError)
                throw new Error(`Error copying file to cache directory: ${response.copyError}`)
            if (!response.fileCopyUri)
                throw new Error("File copy uri is not defined")
            if (!response.name)
                throw new Error("File name is not defined")

            const fileCopyUri = response.fileCopyUri.replaceAll("%20", " ").replace("file://", "")

            const baseDirectory = action === "encrypt"
                ? Constants.fullPathTemporaryEncrypted
                : Constants.fullPathTemporaryDecrypted
            const internalEncryptedFilePath = `${baseDirectory}/${response.name}`
            await RNFS.moveFile(fileCopyUri, internalEncryptedFilePath)

            return {
                name: response.name,
                path: internalEncryptedFilePath,
            }
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                return null
            }

            const alerText: TranslationKeyType = action === "encrypt"
                ? "FileHome_alert_errorSelectingFileToEncrypt_text"
                : "FileHome_alert_errorSelectingFileToDecrypt_text"

            log.error(`Error selecting files for action "${action}": ${stringifyError(error)}`)
            Alert.alert(
                translate("warn"),
                translate(alerText)
            )
        }

        return null
    }

    async function encryptFile() {
        if (settings.fileExplorer === "app") {
            const hasPermission = await ExternalStorage.isManageExternalStorageAllowed()
            if (!hasPermission) {
                await ExternalStorage.requestManageExternalStorage()
                return
            }

            return navigation.replace("FileExplorer", {
                action: "encrypt",
            })
        }

        const pickedFile = await selectFile("encrypt")
        if (!pickedFile) return

        navigation.replace("FileCode", {
            fileName: pickedFile.name,
            filePath: pickedFile.path,
            action: "encrypt",
        })
    }

    async function decryptFile() {
        if (settings.fileExplorer === "app") {
            const hasPermission = await ExternalStorage.isManageExternalStorageAllowed()
            if (!hasPermission) {
                await ExternalStorage.requestManageExternalStorage()
                return
            }

            return navigation.replace("FileExplorer", {
                action: "decrypt",
            })
        }

        const pickedFile = await selectFile("decrypt")
        if (!pickedFile) return

        navigation.replace("FileCode", {
            fileName: pickedFile.name,
            filePath: pickedFile.path,
            action: "decrypt",
        })
    }


    return (
        <Screen>
            <FileHomeHeader />

            <ScrollScreen>
                <List.Item
                    left={() => <List.Icon icon={"lock-outline"} />}
                    title={translate("FileHome_encryptFile_title")}
                    description={translate("FileHome_encryptFile_text")}
                    onPress={encryptFile}
                    style={{ paddingLeft: 16 }}
                />

                <List.Item
                    left={() => <List.Icon icon={"lock-open-variant-outline"} />}
                    title={translate("FileHome_decryptFile_title")}
                    description={translate("FileHome_decryptFile_text")}
                    onPress={decryptFile}
                    style={{ paddingLeft: 16 }}
                />
            </ScrollScreen>
        </Screen>
    )
}
