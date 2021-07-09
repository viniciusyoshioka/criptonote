import React from "react"
import { ImageSourcePropType, ViewProps } from "react-native"

import { EmptyListImage, EmptyListText, EmptyListView } from "./style"


export interface EmptyListProps extends ViewProps {
    source?: ImageSourcePropType,
    message?: string,
}


export function EmptyList(props: EmptyListProps) {
    return (
        <EmptyListView {...props}>
            {props.source && (
                <EmptyListImage source={props.source} />
            )}

            {props.message && (
                <EmptyListText>
                    {props.message}
                </EmptyListText>
            )}
        </EmptyListView>
    )
}
