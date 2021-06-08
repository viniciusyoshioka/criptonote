import React from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle } from "../../component/Header"


export interface SettingsHeaderProps {
    goBack: () => void
}


export function SettingsHeader(props: SettingsHeaderProps) {
    return (
        <Header>
            <BlockLeft>
                <HeaderButton 
                    onPress={props.goBack} 
                    iconName={"md-arrow-back"}
                />
            </BlockLeft>

            <BlockCenter>
                <HeaderTitle>
                    Configurações
                </HeaderTitle>
            </BlockCenter>
        </Header>  
    )
}
