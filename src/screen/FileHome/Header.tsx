import { useNavigation } from "@react-navigation/native"
import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { NavigationParamProps } from "@router"


export interface FileHomeHeaderProps {}


export function FileHomeHeader(props: FileHomeHeaderProps) {


    const navigation = useNavigation<NavigationParamProps<"FileHome">>()

    const safeAreaInsets = useSafeAreaInsets()


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={navigation.goBack} />

            <Appbar.Content title={translate("FileHome_header_title")} />
        </Appbar.Header>
    )
}
