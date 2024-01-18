import { Modal } from "@elementium/native"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Button, RadioButton } from "react-native-paper"

import { useBackHandler } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { FileExplorerType, useSettings } from "@services/settings"


export function FileExplorerSettings() {


    const navigation = useNavigation<NavigationParamProps<"FileExplorerSettings">>()

    const { settings, setSettings } = useSettings()

    const [selectedFileExplorer, setSelectedFileExplorer] = useState(settings.fileExplorer)


    useBackHandler(() => goBack())


    function goBack() {
        navigation.goBack()
        return true
    }

    function updateSettings() {
        const newSettings = { ...settings }
        newSettings.fileExplorer = selectedFileExplorer
        setSettings(newSettings)
    }


    return (
        <Modal.Scrim onPress={goBack}>
            <Modal.Container >
                <Modal.Title>
                    {translate("FileExplorerSettings_title")}
                </Modal.Title>

                <Modal.Content hasDivider={false}>
                    <RadioButton.Group
                        value={selectedFileExplorer}
                        onValueChange={value => setSelectedFileExplorer(value as FileExplorerType)}
                    >
                        <RadioButton.Item
                            label={translate("FileExplorerSettings_app")}
                            value={"app" as FileExplorerType}
                            style={{ paddingLeft: 24, paddingRight: 16 }}
                        />

                        <RadioButton.Item
                            label={translate("FileExplorerSettings_system")}
                            value={"system" as FileExplorerType}
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
                            updateSettings()
                            goBack()
                        }}
                    />
                </Modal.Actions>
            </Modal.Container>
        </Modal.Scrim>
    )
}
