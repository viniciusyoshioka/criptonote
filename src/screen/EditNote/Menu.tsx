import { HeaderButton } from "@elementium/native"
import { useState } from "react"
import { StatusBar } from "react-native"
import { Menu } from "react-native-paper"

import { translate } from "@locales"


export interface EditNoteMenuProps {
    changePassword: () => void;
    deleteNote: () => void;
}


export function EditNoteMenu(props: EditNoteMenuProps) {


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
            <Menu.Item
                title={translate("EditNote_menu_changePassword")}
                onPress={() => {
                    setIsOpen(false)
                    props.changePassword()
                }}
            />

            <Menu.Item
                title={translate("EditNote_menu_deleteNote")}
                onPress={() => {
                    setIsOpen(false)
                    props.deleteNote()
                }}
            />
        </Menu>
    )
}
