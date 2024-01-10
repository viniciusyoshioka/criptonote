import { Modal } from "@elementium/native"
import { ActivityIndicator } from "react-native"
import { Text } from "react-native-paper"

import { useAppTheme } from "@theme"


export interface LoadingModalProps {
    visible: boolean
    message: string
}


export function LoadingModal(props: LoadingModalProps) {


    const { color } = useAppTheme()


    if (!props.visible) {
        return null
    }


    return (
        <Modal.Scrim>
            <Modal.Container style={{ flexDirection: "row", alignItems: "center" }}>
                <ActivityIndicator
                    size={"large"}
                    color={color.onSurface}
                />

                <Text
                    variant={"bodyLarge"}
                    style={{ color: color.onSurface, marginLeft: 16, flex: 1 }}
                    children={props.message}
                />
            </Modal.Container>
        </Modal.Scrim>
    )
}
