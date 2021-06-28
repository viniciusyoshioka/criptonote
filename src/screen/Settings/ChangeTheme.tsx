import React, { memo, useEffect, useState } from "react"

import { ModalButton, ModalTitle, ModalViewButton, ModalViewContent } from "../../component/ModalComponent"
import { ModalFullscreen, ModalFullscreenProps } from "../../component/ModalFullscreen"
import { RadioButton } from "../../component/RadioButton"
import { useSwitchTheme, useTheme } from "../../service/theme"


export interface ChangeThemeProps extends ModalFullscreenProps {}


export const ChangeTheme = memo((props: ChangeThemeProps) => {


    const { appTheme } = useTheme()
    const switchTheme = useSwitchTheme()

    const [selectedTheme, setSelectedTheme] = useState(appTheme)


    useEffect(() => {
        setSelectedTheme(appTheme)
    }, [props.visible])


    return (
        <ModalFullscreen {...props}>
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
        </ModalFullscreen>
    )
})
