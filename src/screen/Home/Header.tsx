/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react"

import { BlockCenter, Header, HeaderTitle } from "../../component/Header"
import { appFName } from "../../service/constant"


export interface HomeHeaderProps {}


export function HomeHeader(props: HomeHeaderProps) {
    return (
        <Header>
            <BlockCenter>
                <HeaderTitle>
                    {appFName}
                </HeaderTitle>
            </BlockCenter>
        </Header>
    )
}
