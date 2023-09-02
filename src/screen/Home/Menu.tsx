import { HeaderButton } from "@elementium/native"
import { useState } from "react"
import { StatusBar } from "react-native"
import { Menu } from "react-native-paper"

import { translate } from "@locales"


export interface HomeMenuProps {
    isSelectionMode: boolean;
    importNotes: () => void;
    exportNotes: () => void;
    openSettings: () => void;
}


export function HomeMenu(props: HomeMenuProps) {


    const [isOpen, setIsOpen] = useState(false)


    function MenuAnchor() {
        return (
            <HeaderButton
                iconName={"more-vert"}
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
                        props.openSettings()
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
