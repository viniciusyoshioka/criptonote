import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { StatusBar } from "react-native"
import { Appbar, Menu } from "react-native-paper"

import { translate } from "@locales"
import { NavigationParamProps } from "@router"


export interface HomeMenuProps {
    isSelectionMode: boolean
    importNotes: () => void
    exportNotes: () => void
}


export function HomeMenu(props: HomeMenuProps) {


    const navigation = useNavigation<NavigationParamProps<"Home">>()

    const [isOpen, setIsOpen] = useState(false)


    function MenuAnchor() {
        return (
            <Appbar.Action
                icon={"dots-vertical"}
                onPress={() => setIsOpen(true)}
            />
        )
    }


    return (
        <Menu
            anchor={<MenuAnchor />}
            visible={isOpen}
            onDismiss={() => setIsOpen(false)}
            statusBarHeight={StatusBar.currentHeight}
        >
            {!props.isSelectionMode && <>
                <Menu.Item
                    title={translate("Home_menu_importNote")}
                    onPress={() => {
                        setIsOpen(false)
                        props.importNotes()
                    }}
                />

                <Menu.Item
                    title={translate("Home_menu_exportNote")}
                    onPress={() => {
                        setIsOpen(false)
                        props.exportNotes()
                    }}
                />

                <Menu.Item
                    title={translate("Home_menu_settings")}
                    onPress={() => {
                        setIsOpen(false)
                        navigation.navigate("Settings")
                    }}
                />
            </>}

            {props.isSelectionMode && <>
                <Menu.Item
                    title={translate("Home_menu_exportNote")}
                    onPress={() => {
                        setIsOpen(false)
                        props.exportNotes()
                    }}
                />
            </>}
        </Menu>
    )
}
