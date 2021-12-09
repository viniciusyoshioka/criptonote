import React, { createRef, useEffect, useState } from "react"
import { Alert, Keyboard, TextInput, TouchableWithoutFeedback } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"

import { useBackHandler, useKeyboard } from "../../service/hook"
import { ReadHeader } from "./Header"
import { ScreenParams } from "../../service/screen-params"
import { ChangePassword } from "./ChangePassword"
import { decryptString, encryptString } from "../../service/crypto"
import { InputText, InputTitle, SafeScreen, SpaceScreen } from "../../component"
import { NoteDatabase } from "../../database"
import { log } from "../../service/log"


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


    async function readNote() {
        let note
        try {
            note = await NoteDatabase.getNote(params.noteId)
        } catch (error) {
            log.error(`Error opening note: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro abrindo nota"
            )
            navigation.navigate("Home")
            return
        }

        if (params.password === "") {
            setTitle(note.title)
            setText(note.text)
            return
        }

        let decryptedText: string
        try {
            decryptedText = await decryptString(note.text, params.password)
        } catch (error) {
            log.error(`Error decrypting note while opening: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro ao descriptografar nota em sua abertura"
            )
            navigation.navigate("Home")
            return
        }

        setTitle(note.title)
        setText(decryptedText)
    }

    function goBack() {
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
    }

    function setNoteValue(newValue: string, inputField: "title" | "text") {
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
                log.debug(`Invalid inputField value: "${inputField}" to set note value`)
                throw new Error("Unknown inputField value")
        }
    }

    async function saveNote() {
        let textToSave = text
        if (params.password !== "") {
            try {
                textToSave = await encryptString(text, params.password)
            } catch (error) {
                log.error(`Unknown error while encrypting note. Could not save it: "${error}"`)
                Alert.alert(
                    "Alerta",
                    "Erro desconhecido ao criptografar nota. Não foi possível salvá-la"
                )
                return
            }
        }

        try {
            await NoteDatabase.updateNote(params.noteId, title, textToSave)
        } catch (error) {
            log.error(`Error updating note in database: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro ao salvar nota"
            )
        }
        navigation.reset({ routes: [{ name: "Home" }] })
    }

    async function deleteCurrentNote() {
        async function alertDeleteNote() {
            try {
                await NoteDatabase.deleteNote([params.noteId])
                navigation.reset({ routes: [{ name: "Home" }] })
            } catch (error) {
                log.error(`Error deleting current note: "${error}"`)
                Alert.alert(
                    "Aviso",
                    "Erro ao apagar nota atual"
                )
            }
        }

        Alert.alert(
            "Aviso",
            "Esta nota será apagada",
            [
                { text: "Cancelar", onPress: () => { } },
                { text: "Ok", onPress: alertDeleteNote }
            ]
        )
    }

    async function changePassword(
        currentPassword: string,
        newPassword: string,
        confirmNewPassword: string
    ) {
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

        let note
        try {
            note = await NoteDatabase.getNote(params.noteId)
        } catch (error) {
            log.error(`Error getting note: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro ao carregar nota"
            )
            return
        }

        let encryptedNewPasswordText = ""
        try {
            const decryptedCurrentPasswordText = await decryptString(note.text, currentPassword)
            encryptedNewPasswordText = await encryptString(decryptedCurrentPasswordText, newPassword)
        } catch (error) {
            log.error(`Error changing note password. Process interrupted: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro ao trocar senha da nota. Processo interrompido"
            )
            return
        }

        try {
            await NoteDatabase.updateNote(params.noteId, note.title, encryptedNewPasswordText)
        } catch (error) {
            log.error(`Error updating note in database: "${error}"`)
            Alert.alert(
                "Aviso",
                "Erro salvando nota ao mudar senha. Processo interrompido"
            )
        }
        navigation.reset({ routes: [{ name: "Home" }] })
    }

    function exportNote() {
        if (isChanged) {
            Alert.alert(
                "Aviso",
                "Salve ou descarte as modificações antes de exportar"
            )
            return
        }

        NoteDatabase.exportNote([params.noteId])
            .then(() => { })
            .catch((error) => {
                log.error(`Error exporting note: "${error}"`)
                Alert.alert(
                    "Aviso",
                    "Erro exportando nota"
                )
            })
    }


    useEffect(() => {
        readNote()
    }, [])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeScreen>
                <ReadHeader
                    isChanged={isChanged}
                    title={title}
                    goBack={goBack}
                    saveNote={saveNote}
                    exportNote={exportNote}
                    changePassword={() => setShowChangePassword(true)}
                    deleteNote={deleteCurrentNote}
                />

                <SpaceScreen>
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
                </SpaceScreen>

                <ChangePassword
                    visible={showChangePassword}
                    setVisible={setShowChangePassword}
                    changePassword={changePassword}
                />
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
