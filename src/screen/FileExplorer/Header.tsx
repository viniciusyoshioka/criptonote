import { Appbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"


export interface FileExplorerHeaderProps {
    goBack: () => void
}


export function FileExplorerHeader(props: FileExplorerHeaderProps) {


    const safeAreaInsets = useSafeAreaInsets()


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={props.goBack} />

            <Appbar.Content title={translate("FileExplorer_header_title")} />
        </Appbar.Header>
    )
}
