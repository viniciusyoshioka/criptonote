import React, { useEffect } from "react"
import { ViewProps } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import * as ExpoAuth from "expo-local-authentication"

import { Button, Text } from "./style"
import { useTheme } from "../../service/theme"
import { CenterScreen, SpaceScreen } from "../Screen"


export interface AddBioProps extends ViewProps {
    onDone: () => void,
}


export function AddBio(props: AddBioProps) {


    const { color, opacity } = useTheme()


    function authBiometry() {
        ExpoAuth.authenticateAsync()
            .then((success: ExpoAuth.LocalAuthenticationResult) => {
                if (success.success) {
                    props.onDone()
                }
            })
    }


    useEffect(() => {
        authBiometry()
    }, [])


    return (
        <SpaceScreen {...props}>
            <CenterScreen>
                <Button onPress={authBiometry} activeOpacity={0.7}>
                    <Icon
                        name={"fingerprint"}
                        size={50}
                        color={color.screen_color}
                        style={{
                            opacity: opacity.highEmphasis
                        }}
                    />

                    <Text>
                        Adicionar biometria
                    </Text>
                </Button>
            </CenterScreen>
        </SpaceScreen>
    )
}
