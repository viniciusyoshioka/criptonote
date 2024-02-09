import { Modal } from "@elementium/native"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Button, RadioButton } from "react-native-paper"

import { useBackHandler } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { useSettings } from "@services/settings"


enum AllowScreenshotType {
    ALLOW = "allow",
    DENY = "deny",
}


export function AllowScreenshot() {


    const navigation = useNavigation<NavigationParamProps<"AllowScreenshot">>()
    const { settings, setSettings } = useSettings()

    const [selectedOption, setSelectedOption] = useState<AllowScreenshotType>(() => (
        settings.allowScreenshot ? AllowScreenshotType.ALLOW : AllowScreenshotType.DENY
    ))


    useBackHandler(() => goBack())


    function goBack() {
        navigation.goBack()
        return true
    }

    function updateSettings() {
        if (settings.allowScreenshot && selectedOption === AllowScreenshotType.ALLOW) {
            goBack()
            return
        }

        setSettings({
            ...settings,
            allowScreenshot: selectedOption === AllowScreenshotType.ALLOW,
        })
        goBack()
    }


    return (
        <Modal.Scrim onPress={goBack}>
            <Modal.Container>
                <Modal.Title>
                    {translate("AllowScreenshot_title")}
                </Modal.Title>

                <Modal.Description>
                    {translate("AllowScreenshot_description")}
                </Modal.Description>

                <Modal.Content hasDivider={false}>
                    <RadioButton.Group
                        value={selectedOption}
                        onValueChange={value => setSelectedOption(value as AllowScreenshotType)}
                    >
                        <RadioButton.Item
                            label={translate("allow")}
                            value={AllowScreenshotType.ALLOW}
                            style={{ paddingLeft: 24, paddingRight: 16 }}
                        />

                        <RadioButton.Item
                            label={translate("deny")}
                            value={AllowScreenshotType.DENY}
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
                        onPress={updateSettings}
                    />
                </Modal.Actions>
            </Modal.Container>
        </Modal.Scrim>
    )
}
