import React, { memo } from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle } from "../../component/Header"


export interface ChoosePasswordTypeHeaderProps {
    goBack: () => void,
}


export const ChoosePasswordTypeHeader = memo((props: ChoosePasswordTypeHeaderProps) => {
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
                    Escolher tipo de senha
                </HeaderTitle>
            </BlockCenter>
        </Header>  
    )
})
