import { ModalActions, ModalContainer, ModalContent, ModalScrim, ModalTitle, RadioListItem } from "@elementium/native"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Button } from "react-native-paper"

import { useBackHandler } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { useAppTheme } from "@theme"


export function ChangeTheme() {


    const navigation = useNavigation<NavigationParamProps<"ChangeTheme">>()

    const { appTheme, switchTheme } = useAppTheme()

    const [selectedTheme, setSelectedTheme] = useState(appTheme)


    useBackHandler(() => goBack())


    function goBack() {
        navigation.goBack()
        return true
    }


    return (
        <ModalScrim onPress={goBack}>
            <ModalContainer >
                <ModalTitle>
                    {translate("ChangeTheme_title")}
                </ModalTitle>

                <ModalContent>
                    <RadioListItem
                        title={translate("ChangeTheme_auto")}
                        value={selectedTheme === "auto"}
                        onPress={() => setSelectedTheme("auto")}
                        style={{ paddingLeft: 0, backgroundColor: "transparent" }}
                    />

                    <RadioListItem
                        title={translate("ChangeTheme_light")}
                        value={selectedTheme === "light"}
                        onPress={() => setSelectedTheme("light")}
                        style={{ paddingLeft: 0, backgroundColor: "transparent" }}
                    />

                    <RadioListItem
                        title={translate("ChangeTheme_dark")}
                        value={selectedTheme === "dark"}
                        onPress={() => setSelectedTheme("dark")}
                        style={{ paddingLeft: 0, backgroundColor: "transparent" }}
                    />
                </ModalContent>

                <ModalActions>
                    <Button
                        mode={"text"}
                        children={translate("cancel")}
                        onPress={goBack}
                    />

                    <Button
                        mode={"text"}
                        children={translate("ok")}
                        onPress={() => {
                            switchTheme(selectedTheme)
                            goBack()
                        }}
                    />
                </ModalActions>
            </ModalContainer>
        </ModalScrim>
    )
}
