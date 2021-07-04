import React, { createRef, useCallback, useEffect, useState } from "react"
import { Alert, Keyboard, TextInput, TouchableWithoutFeedback } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"

import { SafeScreen } from "../../component/Screen"
import { useBackHandler, useKeyboard } from "../../service/hook"
import { ReadHeader } from "./Header"
import { InputTitle } from "../../component/InputTitle"
import { InputText } from "../../component/InputText"
import { ViewInput } from "./style"
import { deleteNote, saveEditedNote } from "../../service/note-handler"
import { ScreenParams } from "../../service/screen-params"
import { ChangePassword } from "./ChangePassword"
import { decryptString, encryptString } from "../../service/crypto"


export function Read() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "Read">>()

    const inputTitleRef = createRef<TextInput>()
    const inputTextRef = createRef<TextInput>()

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [isChanged, setIsChanged] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)


    useBackHandler(() => {
        goBack()
        return true
    })

    useKeyboard("keyboardDidHide", () => {
        if (inputTitleRef.current?.isFocused()) {
            inputTitleRef.current.blur()
            return
        }

        if (inputTextRef.current?.isFocused()) {
            inputTextRef.current.blur()
            return
        }
    })


    const goBack = useCallback(() => {
        if (showChangePassword) {
            setShowChangePassword(false)
            return
        }

        if (isChanged) {
            Alert.alert(
                "Aviso",
                "Esta nota foi alterada, sair irá descartá-la",
                [
                    { text: "Cancelar", onPress: () => { } },
                    { text: "Voltar", onPress: () => navigation.navigate("Home") }
                ]
            )
            return
        }

        navigation.navigate("Home")
    }, [showChangePassword, isChanged])

    const setNoteValue = useCallback((newValue: string, inputField: "title" | "text") => {
        switch (inputField) {
            case "title":
                setTitle(newValue)
                if (!isChanged) {
                    setIsChanged(true)
                }
                break
            case "text":
                setText(newValue)
                if (!isChanged) {
                    setIsChanged(true)
                }
                break
            default:
                throw new Error("Unknown inputField value")
        }
    }, [isChanged])

    const saveNote = useCallback(async () => {
        let textToSave = text
        if (params.password !== "") {
            try {
                textToSave = await encryptString(text, params.password)
            } catch {
                Alert.alert(
                    "Alerta",
                    "Erro desconhecido ao criptografar texto. Não foi possível salvar a nota"
                )
                return
            }
        }

        await saveEditedNote(params.note, title, textToSave)
        navigation.reset({ routes: [{ name: "Home" }] })
    }, [title, text])

    const deleteCurrentNote = useCallback(async () => {
        async function alertDeleteNote() {
            await deleteNote([params.note.id])
            navigation.reset({ routes: [{ name: "Home" }] })
        }

        Alert.alert(
            "Aviso",
            "Esta nota será apagada",
            [
                { text: "Cancelar", onPress: () => { } },
                { text: "Ok", onPress: alertDeleteNote }
            ]
        )
    }, [])

    const changePassword = useCallback(async (
        currentPassword: string, newPassword: string, confirmNewPassword: string
    ) => {
        if (isChanged) {
            Alert.alert(
                "Aviso",
                "A nota foi alterada. Salve antes de mudar a senha"
            )
            return
        }

        if (newPassword !== confirmNewPassword) {
            Alert.alert(
                "Aviso",
                "A nova senha é diferente de sua confirmação"
            )
            return
        }

        let encryptedNewPasswordText = ""
        try {
            const decryptedCurrentPasswordText = await decryptString(params.note.text, currentPassword)
            encryptedNewPasswordText = await encryptString(decryptedCurrentPasswordText, newPassword)
        } catch {
            Alert.alert(
                "Aviso",
                "Erro ao trocar senha nota. Processo interrompido"
            )
            return
        }

        await saveEditedNote(params.note, params.note.title, encryptedNewPasswordText)
        navigation.reset({ routes: [{ name: "Home" }] })
    }, [isChanged])


    useEffect(() => {
        async function decryptAndSetNoteContent() {
            let decryptedText = params.note.text
            if (params.password !== "") {
                try {
                    decryptedText = await decryptString(params.note.text, params.password)
                } catch {
                    Alert.alert(
                        "Aviso",
                        "Erro ao descriptografar nota em sua abertura"
                    )
                    navigation.navigate("Home")
                    return
                }
            }
            setTitle(params.note.title)
            setText(decryptedText)
        }

        decryptAndSetNoteContent()
    }, [])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeScreen>
                <ReadHeader
                    isChanged={isChanged}
                    title={title}
                    goBack={goBack}
                    saveNote={saveNote}
                    changePassword={() => setShowChangePassword(true)}
                    deleteNote={deleteCurrentNote}
                />

                <ViewInput>
                    <InputTitle
                        autoFocus={false}
                        value={title}
                        onChangeText={(newText: string) => setNoteValue(newText, "title")}
                        onSubmitEditing={() => inputTextRef.current?.focus()}
                        ref={inputTitleRef}
                    />

                    <InputText
                        value={text}
                        onChangeText={(newText: string) => setNoteValue(newText, "text")}
                        ref={inputTextRef}
                    />
                </ViewInput>

                <ChangePassword
                    visible={showChangePassword}
                    setVisible={setShowChangePassword}
                    changePassword={changePassword}
                />
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
