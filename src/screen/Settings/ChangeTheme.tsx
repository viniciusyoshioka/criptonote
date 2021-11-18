import React, { memo, useEffect, useState } from "react"

import { Modal, ModalButton, ModalProps, ModalTitle, ModalViewButton, ModalViewContent, RadioButton } from "../../component"
import { useTheme } from "../../service/theme"


export interface ChangeThemeProps extends ModalProps { }


export const ChangeTheme = memo((props: ChangeThemeProps) => {


    const { appTheme, switchTheme } = useTheme()

    const [selectedTheme, setSelectedTheme] = useState(appTheme)


    useEffect(() => {
        setSelectedTheme(appTheme)
    }, [props.visible])


    return (
        <Modal {...props}>
            <>
                <ModalTitle>
                    Mudar tema
                </ModalTitle>

                <ModalViewContent>
                    <RadioButton
                        text={"Automático"}
                        value={selectedTheme === "auto"}
                        onPress={() => setSelectedTheme("auto")} />
                    <RadioButton
                        text={"Claro"}
                        value={selectedTheme === "light"}
                        onPress={() => setSelectedTheme("light")} />
                    <RadioButton
                        text={"Escuro"}
                        value={selectedTheme === "dark"}
                        onPress={() => setSelectedTheme("dark")} />
                </ModalViewContent>

                <ModalViewButton>
                    <ModalButton
                        text={"Cancelar"}
                        onPress={() => props.setVisible(false)}
                    />

                    <ModalButton
                        text={"Ok"}
                        onPress={() => {
                            switchTheme(selectedTheme)
                            props.setVisible(false)
                        }}
                    />
                </ModalViewButton>
            </>
        </Modal>
    )
})
