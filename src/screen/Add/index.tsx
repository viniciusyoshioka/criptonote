import React, { createRef, useCallback, useState } from "react"
import { Alert, Keyboard, TextInput, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { SafeScreen } from "../../component/Screen"
import { useBackHandler, useKeyboard } from "../../service/hook"
import { AddHeader } from "./Header"
import { InputTitle } from "../../component/InputTitle"
import { InputText } from "../../component/InputText"
import { ViewInput } from "./style"
import { InputPassword, ShowPasswordButton, ViewInputPassword } from "../../component/InputPassword"
import { saveNewNote } from "../../service/note-handler"
import { Crypto } from "../../service/crypto"


export function Add() {


    const navigation = useNavigation()

    const inputTitleRef = createRef<TextInput>()
    const inputPasswordRef = createRef<TextInput>()
    const inputTextRef = createRef<TextInput>()

    const [showPassword, setShowPassword] = useState(false)
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


    const goBack = useCallback(() => {
        if (title !== "" || text !== "") {
            Alert.alert(
                "Aviso",
                "Esta nota tem alterações não salvas, sair irá descartá-las",
                [
                    {text: "Cancelar", onPress: () => {}},
                    {text: "Voltar", onPress: () => navigation.navigate("Home")}
                ]
            )
            return
        }

        navigation.navigate("Home")
    }, [title, text])

    const saveNote = useCallback(async () => {
        async function encrypt(text: string, password: string) {
            if (password === "") {
                return text
            }

            return await Crypto.encrypt(text, password)
        }

        const encryptedText = await encrypt(text, password)
        await saveNewNote(title, encryptedText)

        navigation.reset({routes: [{name: "Home"}]})
    }, [title, password, text])

    const cancelNote = useCallback(() => {
        if (title !== "" || text !== "") {
            Alert.alert(
                "Aviso",
                "Esta nota será descartada",
                [
                    {text: "Cancelar", onPress: () => {}},
                    {text: "Ok", onPress: () => navigation.navigate("Home")}
                ]
            )
            return
        }

        navigation.navigate("Home")
    }, [title, text])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeScreen>
                <AddHeader
                    goBack={goBack}
                    saveNote={saveNote}
                    cancelNote={cancelNote}
                />

                <ViewInput>
                    <InputTitle
                        value={title}
                        onChangeText={(newText: string) => setTitle(newText)}
                        onSubmitEditing={() => inputPasswordRef.current?.focus()}
                        ref={inputTitleRef}
                    />

                    <ViewInputPassword>
                        <InputPassword
                            showPassword={showPassword}
                            value={password}
                            onChangeText={(newText: string) => setPassword(newText)}
                            onSubmitEditing={() => inputTextRef.current?.focus()}
                            ref={inputPasswordRef}
                        />

                        <ShowPasswordButton
                            showPassword={showPassword}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    </ViewInputPassword>

                    <InputText
                        value={text}
                        onChangeText={(newText: string) => setText(newText)}
                        ref={inputTextRef}
                    />
                </ViewInput>
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
