import { useNavigation } from "@react-navigation/native"
import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { NavigationParamProps } from "@router"


export interface FileExplorerHeaderProps {}


export function FileExplorerHeader(props: FileExplorerHeaderProps) {


    const navigation = useNavigation<NavigationParamProps<"FileExplorer">>()
    const safeAreaInsets = useSafeAreaInsets()


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={navigation.goBack} />

            <Appbar.Content title={translate("FileExplorer_header_title")} />
        </Appbar.Header>
    )
}
