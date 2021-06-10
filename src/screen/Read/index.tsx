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
        if (isChanged) {
            Alert.alert(
                "Aviso",
                "Esta nota foi alterada, sair irá descartá-la",
                [
                    {text: "Cancelar", onPress: () => {}},
                    {text: "Voltar", onPress: () => navigation.navigate("Home")}
                ]
            )
            return
        }

        navigation.navigate("Home")
    }, [isChanged])

    const setNoteValue = useCallback((newValue: string, inputField: "title" | "text") => {
        switch (inputField) {
            case "title":
                setTitle(newValue)
                setIsChanged(true)
                break
            case "text":
                setText(newValue)
                setIsChanged(true)
                break
            default:
                throw new Error("Unknown inputField value")
        }
    }, [])

    const saveNote = useCallback(async () => {
        // TODO

        await saveEditedNote(params.note, title, text)
        navigation.reset({routes: [{name: "Home"}]})
    }, [title, text])

    const deleteCurrentNote = useCallback(async () => {
        async function alertDeleteNote() {
            await deleteNote([params.note.id])
            navigation.reset({routes: [{name: "Home"}]})
        }

        Alert.alert(
            "Aviso",
            "Esta nota será apagada",
            [
                {text: "Cancelar", onPress: () => {}},
                {text: "Ok", onPress: alertDeleteNote}
            ]
        )
    }, [])

    const changePassword = useCallback(() => {
        // TODO
    }, [])


    useEffect(() => {
        // TODO
        setTitle(params.note.title)
        setText(params.note.text)
    }, [])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeScreen>
                <ChangePassword
                    visible={showChangePassword}
                    setVisible={setShowChangePassword}
                    changePassword={changePassword}
                />

                <ReadHeader
                    isChanged={false}
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
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
