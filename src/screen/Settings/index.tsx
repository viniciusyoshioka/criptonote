import { AnimatedHeaderRef, ListItem, Screen, ScrollScreen } from "@elementium/native"
import { useNavigation } from "@react-navigation/core"
import { useRef } from "react"
import { Alert } from "react-native"
import Share from "react-native-share"

import { useBackHandler, useHeaderColorOnScroll } from "@hooks"
import { translate } from "@locales"
import { NavigationParamProps } from "@router"
import { Constants } from "@services/constant"
import { log, stringifyError } from "@services/log"
import { SettingsHeader } from "./Header"


export { ChangeTheme } from "./ChangeTheme"


export function Settings() {


    const navigation = useNavigation<NavigationParamProps<"Settings">>()

    const settingsHeaderRef = useRef<AnimatedHeaderRef>(null)


    useBackHandler(() => {
        goBack()
        return true
    })


    const onScroll = useHeaderColorOnScroll({
        onInterpolate: color => settingsHeaderRef.current?.setBackgroundColor(color),
    })


    function goBack() {
        navigation.navigate("Home")
    }

    async function shareLogDatabaseFile() {
        try {
            await Share.open({
                type: "application/x-sqlite3",
                url: `file://${Constants.logDatabaseFullPath}`,
                failOnCancel: false,
            })
        } catch (error) {
            log.error(`Error sharing log file: "${stringifyError(error)}"`)
            Alert.alert(
                translate("warn"),
                translate("Settings_alert_errorSharingLogDatabase_text")
            )
        }
    }

    async function shareAppDatabaseFile() {
        try {
            await Share.open({
                type: "application/x-sqlite3",
                url: `file://${Constants.appDatabaseFullPath}`,
                failOnCancel: false,
            })
        } catch (error) {
            log.error(`Error sharing document database file: "${stringifyError(error)}"`)
            Alert.alert(
                translate("warn"),
                translate("Settings_alert_errorSharingAppDatabase_text")
            )
        }
    }


    return (
        <Screen>
            <SettingsHeader ref={settingsHeaderRef} goBack={goBack} />

            <ScrollScreen onScroll={onScroll}>
                <ListItem
                    leadingIcon={{ iconName: "brightness-medium" }}
                    title={translate("Settings_theme_title")}
                    description={translate("Settings_theme_text")}
                    onPress={() => navigation.navigate("ChangeTheme")}
                />

                <ListItem
                    leadingIcon={{ iconName: "receipt-long" }}
                    title={translate("Settings_shareLogDatabase_title")}
                    description={translate("Settings_shareLogDatabase_text")}
                    onPress={shareLogDatabaseFile}
                />

                {__DEV__ && (
                    <ListItem
                        leadingIcon={{ iconName: "receipt-long" }}
                        title={translate("Settings_shareAppDatabase_title")}
                        description={translate("Settings_shareAppDatabase_text")}
                        onPress={shareAppDatabaseFile}
                    />
                )}

                <ListItem
                    leadingIcon={{ iconName: "information-circle-outline", iconGroup: "ionicons" }}
                    title={translate("Settings_appVersionInfo_title")}
                    description={`${Constants.appName} ${Constants.appVersion} - ${Constants.appType}`}
                />
            </ScrollScreen>
        </Screen>
    )
}
