import { Icon, OptionalIconProps } from "@elementium/native"
import { ReactNode } from "react"
import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from "react-native"
import { Text } from "react-native-paper"

import { useAppTheme } from "@theme"


export interface EmptyListProps extends ViewProps, Omit<OptionalIconProps, "style"> {
    visible?: boolean
    imageSource?: ImageSourcePropType
    message?: string
    children?: ReactNode
}


export function EmptyList(props: EmptyListProps) {


    const { color } = useAppTheme()


    if (!props.visible) {
        return null
    }


    return (
        <View {...props} style={[styles.container, props.style]}>
            {props.name && (
                <Icon
                    name={props.name}
                    group={props.group}
                    size={props.size}
                    color={props.color ?? color.onBackground}
                    style={props.style}
                />
            )}

            {props.imageSource && (
                <Image
                    source={props.imageSource}
                    style={{ width: 100, height: 100, tintColor: color.onBackground }}
                />
            )}

            {props.message && (
                <Text
                    variant={"bodyLarge"}
                    style={{ color: color.onBackground, marginTop: 8 }}
                    children={props.message}
                />
            )}

            {props.children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
