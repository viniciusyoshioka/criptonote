import { Button, ModalActions, ModalContainer, ModalContent, ModalDescription, ModalScrim, ModalTitle } from "@elementium/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useRef, useState } from "react"
import { TextInput } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

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
        <ModalScrim onPress={goBack}>
            <KeyboardAvoidingView behavior={"position"}>
                <ModalContainer>
                    <ModalTitle>
                        {translate("Code_title")}
                    </ModalTitle>

                    <ModalDescription>
                        {translate("Code_description")}
                    </ModalDescription>

                    <ModalContent hasDivider={false} style={{ marginTop: 16 }}>
                        <InputPassword
                            ref={inputPasswordRef}
                            value={password}
                            onChangeText={setPassword}
                            autoFocus={true}
                            onSubmitEditing={openNote}
                        />
                    </ModalContent>

                    <ModalActions>
                        <Button
                            variant={"text"}
                            text={translate("cancel")}
                            onPress={goBack}
                        />

                        <Button
                            variant={"text"}
                            text={translate("ok")}
                            onPress={openNote}
                        />
                    </ModalActions>
                </ModalContainer>
            </KeyboardAvoidingView>
        </ModalScrim>
    )
}
