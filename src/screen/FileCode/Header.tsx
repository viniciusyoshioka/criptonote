import { useNavigation } from "@react-navigation/native"
import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { NavigationParamProps } from "@router"


export interface FileCodeHeaderProps {}


export function FileCodeHeader(props: FileCodeHeaderProps) {


    const navigation = useNavigation<NavigationParamProps<"FileCode">>()

    const safeAreaInsets = useSafeAreaInsets()


    function getTitle() {
        return translate("FileCode_header_title")
    }


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={navigation.goBack} />

            <Appbar.Content title={getTitle()} />
        </Appbar.Header>
    )
}
