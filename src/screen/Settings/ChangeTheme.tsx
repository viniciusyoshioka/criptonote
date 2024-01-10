import { Modal } from "@elementium/native"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Button, RadioButton } from "react-native-paper"

import { useBackHandler } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { ThemeType, useAppTheme } from "@theme"


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
        <Modal.Scrim onPress={goBack}>
            <Modal.Container >
                <Modal.Title>
                    {translate("ChangeTheme_title")}
                </Modal.Title>

                <Modal.Content hasDivider={false}>
                    <RadioButton.Group
                        value={selectedTheme}
                        onValueChange={value => setSelectedTheme(value as ThemeType)}
                    >
                        <RadioButton.Item
                            label={translate("ChangeTheme_auto")}
                            value={"auto" as ThemeType}
                            style={{ paddingLeft: 24, paddingRight: 16 }}
                        />

                        <RadioButton.Item
                            label={translate("ChangeTheme_light")}
                            value={"light" as ThemeType}
                            style={{ paddingLeft: 24, paddingRight: 16 }}
                        />

                        <RadioButton.Item
                            label={translate("ChangeTheme_dark")}
                            value={"dark" as ThemeType}
                            style={{ paddingLeft: 24, paddingRight: 16 }}
                        />
                    </RadioButton.Group>
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
                        onPress={() => {
                            switchTheme(selectedTheme)
                            goBack()
                        }}
                    />
                </Modal.Actions>
            </Modal.Container>
        </Modal.Scrim>
    )
}
