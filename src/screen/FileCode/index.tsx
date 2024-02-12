import { Screen, ScrollScreen } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRef, useState } from "react"
import { Alert, StatusBar, StyleSheet, TextInput, View } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { Button, List, Switch } from "react-native-paper"

import { Input, InputPassword } from "@components"
import { useBackHandler, useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps, RouteParamProps } from "@router"
import { Constants } from "@services/constant"
import { Crypto } from "@services/crypto"
import { createAllFolders } from "@services/folder-handler"
import { FileCodeHeader } from "./Header"


export function FileCode() {


    const navigation = useNavigation<NavigationParamProps<"FileCode">>()
    const { params } = useRoute<RouteParamProps<"FileCode">>()

    const fileNameInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const originalFileName = params.filePath.split("/").pop() as string
    const [fileName, setFileName] = useState(originalFileName)
    const [password, setPassword] = useState("")
    const [deleteOriginalFile, setDeleteOriginalFile] = useState(true)


    useBackHandler(() => {
        goBack()
        return true
    })

    useBlurInputOnKeyboardDismiss([fileNameInputRef, passwordInputRef])


    function goBack() {
        navigation.goBack()
    }

    function isFormValid() {
        if (fileName.trim().length === 0) {
            Alert.alert(
                translate("warn"),
                translate("FileCode_alert_fileNameRequired_text")
            )
            return false
        }
        if (password.trim().length === 0) {
            Alert.alert(
                translate("warn"),
                translate("FileCode_alert_passwordRequired_text")
            )
            return false
        }
        return true
    }

    async function executeEncryption() {
        const isValid = isFormValid()
        if (!isValid) return

        await createAllFolders()

        const destinationPath = `${Constants.fullPathEncrypted}/${originalFileName}.${Constants.encryptedFilesExtension}`
        Crypto.encryptFileService({
            fileName: originalFileName,
            sourcePath: params.filePath,
            destinationPath,
            password: password.trim(),
            deleteOriginalFile,
        })

        Alert.alert(
            translate("warn"),
            translate("FileCode_alert_startingFileEncryption_text")
        )

        navigation.reset({
            routes: [
                { name: "Home" }
            ]
        })
    }

    async function executeDecryption() {
        const isValid = isFormValid()
        if (!isValid) return

        await createAllFolders()

        const ENCRYPTED_FILE_EXTENSION = `.${Constants.encryptedFilesExtension}`
        let decryptedFileName = originalFileName
        if (decryptedFileName.endsWith(ENCRYPTED_FILE_EXTENSION)) {
            const splitFileName = decryptedFileName.split(".")
            splitFileName.pop()
            decryptedFileName = splitFileName.join(".")
        }

        const destinationPath = `${Constants.fullPathDecrypted}/${originalFileName}`

        Crypto.decryptFileService({
            fileName: decryptedFileName,
            sourcePath: params.filePath,
            destinationPath,
            password: password.trim(),
            deleteOriginalFile,
        })

        Alert.alert(
            translate("warn"),
            translate("FileCode_alert_startingFileDecryption_text")
        )

        navigation.reset({
            routes: [
                { name: "Home" }
            ]
        })
    }


    return (
        <Screen>
            <KeyboardAvoidingView
                style={styles.wrapper}
                behavior={"padding"}
                keyboardVerticalOffset={-(StatusBar.currentHeight ?? 0)}
            >
                <FileCodeHeader />

                <ScrollScreen keyboardShouldPersistTaps={"handled"}>
                    <Input
                        ref={fileNameInputRef}
                        placeholder={translate("FileCode_fileName")}
                        value={fileName}
                        onChangeText={setFileName}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        returnKeyType={"next"}
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                        style={{ marginHorizontal: 16, marginTop: 16 }}
                    />

                    <InputPassword
                        ref={passwordInputRef}
                        value={password}
                        onChangeText={setPassword}
                        onSubmitEditing={() => passwordInputRef.current?.blur()}
                        wrapperStyle={{ marginHorizontal: 16, marginTop: 16 }}
                    />

                    <List.Item
                        title={translate("FileCode_deleteOriginalFile")}
                        right={() => (
                            <Switch
                                value={deleteOriginalFile}
                                onValueChange={setDeleteOriginalFile}
                            />
                        )}
                        style={styles.deleteOriginalFileWrapper}
                        onPress={() => setDeleteOriginalFile(!deleteOriginalFile)}
                    />
                </ScrollScreen>

                <View style={styles.buttonsWrapper}>
                    <Button
                        mode={"contained"}
                        children={translate("FileCode_encrypt")}
                        onPress={executeEncryption}
                        style={{ width: "100%" }}
                    />

                    <Button
                        mode={"contained"}
                        children={translate("FileCode_decrypt")}
                        onPress={executeDecryption}
                        style={{ width: "100%" }}
                    />
                </View>
            </KeyboardAvoidingView>
        </Screen>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-between",
    },
    deleteOriginalFileWrapper: {
        marginTop: 16,
        paddingLeft: 4,
    },
    buttonsWrapper: {
        padding: 16,
        gap: 8,
    },
})
