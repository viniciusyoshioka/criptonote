import React, { memo } from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle } from "../../component/Header"


export interface SettingsHeaderProps {
    goBack: () => void,
}


export const SettingsHeader = memo((props: SettingsHeaderProps) => {
    return (
        <Header>
            <BlockLeft>
                <HeaderButton 
                    onPress={props.goBack} 
                    iconName={"arrow-back"}
                />
            </BlockLeft>

            <BlockCenter>
                <HeaderTitle>
                    Configurações
                </HeaderTitle>
            </BlockCenter>
        </Header>  
    )
})
