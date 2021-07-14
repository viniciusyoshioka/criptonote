import React, { createRef, useCallback, useState } from "react"
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { useBackHandler, useKeyboard } from "../../service/hook"
import { CodeHeader } from "./Header"
import { ScreenParams } from "../../service/screen-params"
import { Button, CenterScreen, InputPassword, SafeScreen, SpaceScreen } from "../../component"


export function Code() {


    const navigation = useNavigation()
    const { params } = useRoute<RouteProp<ScreenParams, "Code">>()

    const inputPasswordRef = createRef<TextInput>()

    const [password, setPassword] = useState("")


    useBackHandler(() => {
        goBack()
        return true
    })

    useKeyboard("keyboardDidHide", () => {
        if (inputPasswordRef.current?.isFocused()) {
            inputPasswordRef.current.blur()
        }
    })


    const goBack = useCallback(() => {
        navigation.navigate("Home")
    }, [])

    const openNote = useCallback(() => {
        navigation.navigate("Read", {
            note: params.note,
            password: password
        })
    }, [password])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeScreen>
                <CodeHeader
                    goBack={goBack}
                />

                <SpaceScreen>
                    <CenterScreen>
                        <InputPassword
                            autoFocus={true}
                            onChangeText={(newText: string) => setPassword(newText)}
                            ref={inputPasswordRef}
                            returnKeyType={"done"}
                            onSubmitEditing={openNote}
                            value={password}
                        />

                        <Button
                            text={"Abrir"}
                            onPress={openNote}
                        />
                    </CenterScreen>
                </SpaceScreen>
            </SafeScreen>
        </TouchableWithoutFeedback>
    )
}
