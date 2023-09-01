import { ModalContainer, ModalScrim, Text } from "@elementium/native"
import { ActivityIndicator } from "react-native"

import { useAppTheme } from "@theme"


export interface LoadingModalProps {
    visible: boolean;
    message: string;
}


export function LoadingModal(props: LoadingModalProps) {


    const { color } = useAppTheme()


    if (!props.visible) {
        return null
    }


    return (
        <ModalScrim>
            <ModalContainer style={{ flexDirection: "row", alignItems: "center" }}>
                <ActivityIndicator
                    size={"large"}
                    color={color.onSurface}
                />

                <Text
                    variant={"body"}
                    size={"large"}
                    style={{ color: color.onSurface, marginLeft: 16, flex: 1 }}
                    children={props.message}
                />
            </ModalContainer>
        </ModalScrim>
    )
}
