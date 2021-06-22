import React, {  } from "react"
import { ViewProps } from "react-native"

import { CenterScreen } from "../Screen"


export interface AddBioProps extends ViewProps {}


// TODO
export function AddBio(props: AddBioProps) {
    return (
        <CenterScreen {...props} />
    )
}
