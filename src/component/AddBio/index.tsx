import React, { useEffect } from "react"
import { ViewProps } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import * as ExpoAuth from "expo-local-authentication"

import { useTheme } from "../../service/theme"
import { CenterScreen } from "../Screen"


export interface AddBioProps extends ViewProps {
    onDone: () => void,
}


export function AddBio(props: AddBioProps) {


    const { color } = useTheme()


    useEffect(() => {
        ExpoAuth.authenticateAsync()
            .then((success: ExpoAuth.LocalAuthenticationResult) => {
                if (success.success) {
                    props.onDone()
                }
            })
    }, [])


    return (
        <CenterScreen {...props}>
            <Icon
                name={"fingerprint"}
                size={50}
                color={color.screen_color}
            />
        </CenterScreen>
    )
}
