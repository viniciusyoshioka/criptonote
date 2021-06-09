import React, { createRef, useCallback, useState } from "react"
import { Alert, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/core"

import { SafeScreen } from "../../component/Screen"
import { useBackHandler } from "../../service/hook"
import { AddHeader } from "./Header"
import { InputTitle } from "../../component/InputTitle"
import { InputText } from "../../component/InputText"
import { ViewInput } from "./style"
import { InputPassword, ShowPasswordButton, ViewInputPassword } from "../../component/InputPassword"


export function Add() {


    const navigation = useNavigation()

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

    const saveNote = useCallback(() => {
        // TODO
    }, [])

    const cancelNote = useCallback(() => {
        // TODO
    }, [])


    return (
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
    )
}
