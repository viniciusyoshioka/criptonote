import { AnimatedHeaderRef, Button, RadioListItem, Screen, ScrollScreen, Text } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRef, useState } from "react"
import { Alert, StatusBar, StyleSheet, TextInput, View } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

import { Input, InputPassword } from "@components"
import { useBackHandler, useBlurInputOnKeyboardDismiss, useHeaderColorOnScroll } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps, RouteParamProps } from "@router"
import { Constants } from "@services/constant"
import { Crypto } from "@services/crypto"
import { createAllFolders } from "@services/folder-handler"
import { useAppTheme } from "@theme"
import { FileCodeHeader } from "./Header"


export function FileCode() {


    const navigation = useNavigation<NavigationParamProps<"FileCode">>()
    const { params } = useRoute<RouteParamProps<"FileCode">>()

    const { color } = useAppTheme()

    const fileCodeHeaderRef = useRef<AnimatedHeaderRef>(null)
    const fileNameInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const [fileName, setFileName] = useState(params.fileName)
    const [password, setPassword] = useState("")
    const [deleteOriginalFile, setDeleteOriginalFile] = useState(true)


    useBackHandler(() => {
        goBack()
        return true
    })

    useBlurInputOnKeyboardDismiss([fileNameInputRef, passwordInputRef])


    const onScroll = useHeaderColorOnScroll({
        onInterpolate: color => fileCodeHeaderRef.current?.setBackgroundColor(color),
    })


    function goBack() {
        navigation.replace("FileHome")
    }

    function getExecuteButtonText() {
        if (params.action === "encrypt") {
            return translate("FileCode_encrypt")
        } else if (params.action === "decrypt") {
            return translate("FileCode_decrypt")
        } else {
            throw new Error(`Invalid screen action: "${params.action}"`)
        }
    }

    async function execute() {
        const isValid = isFormValid()
        if (!isValid) return

        if (params.action === "encrypt") {
            await executeEncryption()
        } else if (params.action === "decrypt") {
            await executeDecryption()
        } else {
            throw new Error(`Invalid screen action: "${params.action}"`)
        }
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
        await createAllFolders()

        const destinationPath = `${Constants.fullPathEncrypted}/${params.fileName}.${Constants.encryptedFilesExtension}`

        Crypto.encryptFileService({
            fileName: params.fileName,
            sourcePath: params.filePath,
            destinationPath,
            password: password.trim(),
            deleteOriginalFile,
        })

        Alert.alert(
            translate("warn"),
            translate("FileCode_alert_startingFileEncryption_text")
        )

        navigation.goBack()
    }

    async function executeDecryption() {
        const ENCRYPTED_FILE_EXTENSION = `.${Constants.encryptedFilesExtension}`

        await createAllFolders()

        let originalFileName = params.fileName
        if (params.fileName.endsWith(ENCRYPTED_FILE_EXTENSION)) {
            const splitFileName = params.fileName.split(".")
            splitFileName.pop()
            originalFileName = splitFileName.join(".")
        }

        const destinationPath = `${Constants.fullPathDecrypted}/${originalFileName}`

        Crypto.decryptFileService({
            fileName: params.fileName,
            sourcePath: params.filePath,
            destinationPath,
            password: password.trim(),
            deleteOriginalFile,
        })

        Alert.alert(
            translate("warn"),
            translate("FileCode_alert_startingFileDecryption_text")
        )

        navigation.goBack()
    }


    return (
        <Screen>
            <KeyboardAvoidingView
                style={styles.wrapper}
                behavior={"padding"}
                keyboardVerticalOffset={-(StatusBar.currentHeight ?? 0)}
            >
                <FileCodeHeader ref={fileCodeHeaderRef} goBack={goBack} />

                <ScrollScreen onScroll={onScroll}>
                    <View style={styles.fileNameWrapper}>
                        <Input
                            ref={fileNameInputRef}
                            placeholder={translate("FileCode_fileName")}
                            value={fileName}
                            onChangeText={setFileName}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            returnKeyType={"next"}
                            onSubmitEditing={() => passwordInputRef.current?.focus()}
                            style={{ flex: 1 }}
                        />

                        <Text
                            variant={"body"}
                            size={"large"}
                            children={`.${Constants.encryptedFilesExtension}`}
                            style={{ color: color.onBackground }}
                        />
                    </View>

                    <InputPassword
                        ref={passwordInputRef}
                        value={password}
                        onChangeText={setPassword}
                        onSubmitEditing={() => passwordInputRef.current?.blur()}
                        wrapperStyle={{ marginHorizontal: 16, marginTop: 16 }}
                    />

                    <RadioListItem
                        title={translate("FileCode_deleteOriginalFile")}
                        value={deleteOriginalFile}
                        onValueChange={setDeleteOriginalFile}
                        onPress={() => setDeleteOriginalFile(!deleteOriginalFile)}
                        style={{ marginTop: 16 }}
                    />
                </ScrollScreen>

                <View style={styles.buttonsWrapper}>
                    <Button
                        variant={"outline"}
                        text={translate("cancel")}
                        onPress={goBack}
                        style={{ width: "100%" }}
                    />

                    <Button
                        text={getExecuteButtonText()}
                        onPress={execute}
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
    fileNameWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginTop: 16,
        gap: 16,
    },
    buttonsWrapper: {
        padding: 16,
        gap: 8,
    },
})