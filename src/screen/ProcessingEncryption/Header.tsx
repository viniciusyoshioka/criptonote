import React, { memo } from "react"

import { Header, BlockLeft, HeaderButton, BlockCenter, HeaderTitle, BlockRight } from "../../component/Header"


export interface ProcessingEncryptionHeaderProps {
    goBack: () => void,
    stopEncryptionTask: () => void,
}


export const ProcessingEncryptionHeader = memo((props: ProcessingEncryptionHeaderProps) => {
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
                    Processando
                </HeaderTitle>
            </BlockCenter>

            <BlockRight>
                <HeaderButton
                    iconName={"md-stop"}
                    onPress={props.stopEncryptionTask}
                />
            </BlockRight>
        </Header>  
    )
})
