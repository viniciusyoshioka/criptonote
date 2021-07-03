import React, { Children, cloneElement, ReactNode } from "react"
import { StyleProp, ViewProps, ViewStyle } from "react-native"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"
import { HeaderButton } from "./Button"
import { HeaderTitle } from "./Title"


const HeaderBase = styled.View`
    flex-direction: row;
    align-items: center;
    height: 56px;
    padding-left: 8px;
    background-color: ${(props: styledProps) => props.theme.color.header_background};
    elevation: 4;
`


export interface HeaderProps extends ViewProps {
    children: ReactNode,
}


export function Header(props: HeaderProps) {
    return (
        <HeaderBase {...props}>
            {Children.toArray(props.children)
                .filter((child) => child != null && typeof child !== "boolean")
                .map((child, index) => {
                    // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
                    if (!React.isValidElement(child) || ![HeaderTitle, HeaderButton].includes(child.type)) {
                        return child
                    }

                    const props: { style?: StyleProp<ViewStyle> } = {}

                    if (child.type === HeaderTitle) {
                        props.style = [
                            index === 0 && { marginLeft: 8 },
                            index !== 0 && { marginLeft: 24 },
                            child.props.style,
                        ]
                    }
                    return cloneElement(child, props)
                })}
        </HeaderBase>
    )
}
