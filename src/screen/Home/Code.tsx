import { Modal } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRef, useState } from "react"
import { TextInput } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"
import { Button } from "react-native-paper"

import { InputPassword } from "@components"
import { useBackHandler, useBlurInputOnKeyboardDismiss } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps, RouteParamProps } from "@router"


export function Code() {


    const navigation = useNavigation<NavigationParamProps<"Code">>()
    const { params } = useRoute<RouteParamProps<"Code">>()

    const inputPasswordRef = useRef<TextInput>(null)

    const [password, setPassword] = useState("")


    useBackHandler(() => {
        goBack()
        return true
    })

    useBlurInputOnKeyboardDismiss([inputPasswordRef])


    function goBack() {
        navigation.goBack()
    }

    function openNote() {
        navigation.replace("ReadNote", {
            note: params.note,
            password: password.trim(),
        })
    }


    return (
        <Modal.Scrim onPress={goBack}>
            <KeyboardAvoidingView behavior={"position"}>
                <Modal.Container>
                    <Modal.Title>
                        {translate("Code_title")}
                    </Modal.Title>

                    <Modal.Description>
                        {translate("Code_description")}
                    </Modal.Description>

                    <Modal.Content hasDivider={false} style={{ marginHorizontal: 24 }}>
                        <InputPassword
                            ref={inputPasswordRef}
                            value={password}
                            onChangeText={setPassword}
                            autoFocus={true}
                            onSubmitEditing={openNote}
                        />
                    </Modal.Content>

                    <Modal.Actions>
                        <Button
                            mode={"text"}
                            children={translate("cancel")}
                            onPress={goBack}
                        />

                        <Button
                            mode={"text"}
                            children={translate("ok")}
                            onPress={openNote}
                        />
                    </Modal.Actions>
                </Modal.Container>
            </KeyboardAvoidingView>
        </Modal.Scrim>
    )
}
