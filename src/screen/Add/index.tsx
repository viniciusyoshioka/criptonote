import React, { createRef, useState } from "react"
import { Alert, Keyboard, TextInput, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { useBackHandler, useKeyboard } from "../../service/hook"
import { AddHeader } from "./Header"
import { encryptString } from "../../service/crypto"
import { InputPassword, InputText, InputTitle, SafeScreen, SpaceScreen } from "../../component"
import { NoteDatabase, useDatabase } from "../../database"


export function Add() {


    const navigation = useNavigation()

    const db = useDatabase()

    const inputTitleRef = createRef<TextInput>()
    const inputPasswordRef = createRef<TextInput>()
    const inputTextRef = createRef<TextInput>()

    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")
    const [text, setText] = useState("")


    useBackHandler(() => {
        goBack()
        return true
    })

    useKeyboard("keyboardDidHide", () => {
        if (inputTitleRef.current?.isFocused()) {
            inputTitleRef.current.blur()
            return
        }

        if (inputPasswordRef.current?.isFocused()) {
            inputPasswordRef.current.blur()
            return
        }

        if (inputTextRef.current?.isFocused()) {
            inputTextRef.current.blur()
            return
        }
    })


    function goBack() {
        if (title !== "" || text !== "") {
            Alert.alert(
                "Aviso",
                "Esta nota tem alterações não salvas, sair irá descartá-las",
                [
                    { text: "Cancelar", onPress: () => { } },
                    { text: "Voltar", onPress: () => navigation.navigate("Home") }
                ]
            )
            return
        }

        navigation.navigate("Home")
    }

    async function saveNote() {
        if (title === "" && text === "") {
            Alert.alert(
                "Aviso",
                "A nota não será salva, pois está vazia",
                [
                    { text: "Cancelar", onPress: () => { } },
                    { text: "Ok", onPress: () => navigation.navigate("Home") }
                ]
            )
            return
        }

        let textToSave = text
        if (password !== "") {
            try {
                textToSave = await encryptString(text, password)
            } catch {
                Alert.alert(
                    "Alerta",
                    "Erro desconhecido ao criptografar nota. Não foi possível salvá-la"
                )
                return
            }
        }

        await NoteDatabase.insertNote(db, title, textToSave)
        navigation.reset({ routes: [{ name: "Home" }] })
    }

    function cancelNote() {
        if (title !== "" || text !== "") {
            Alert.alert(
                "Aviso",
                "Esta nota será descartada",
                [
                    { text: "Cancelar", onPress: () => { } },
                    { text: "Ok", onPress: () => navigation.navigate("Home") }
                ]
            )
            return
        }

        navigation.navigate("Home")
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeScreen>
                <AddHeader
                    goBack={goBack}
                    saveNote={saveNote}
                    cancelNote={cancelNote}
                />

                <SpaceScreen>
                    <InputTitle
                        value={title}
                        onChangeText={(newText: string) => setTitle(newText)}
                        onSubmitEditing={() => inputPasswordRef.current?.focus()}
                        ref={inputTitleRef}
                    />

                    <InputPassword
                        value={password}
                        onChangeText={(newText: string) => setPassword(newText)}
                        onSubmitEditing={() => inputTextRef.current?.focus()}
                        ref={inputPasswordRef}
                    />

                    <InputText
                        value={text}
                        onChangeText={(newText: string) => setText(newText)}
                        ref={inputTextRef}
                    />
                </SpaceScreen>
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
