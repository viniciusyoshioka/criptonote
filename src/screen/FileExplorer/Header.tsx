import { Appbar, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { translate } from "@locales"
import { Constants } from "@services/constant"


export interface FileExplorerHeaderProps {
    goBack: () => void
    pathToRead: string | undefined
}


export function FileExplorerHeader(props: FileExplorerHeaderProps) {


    const safeAreaInsets = useSafeAreaInsets()


    function HeaderTitle() {
        const title = props.pathToRead
            ? props.pathToRead.replace(Constants.fullPathDeviceRootInternalStorage, translate("FileExplorer_header_internalStorage"))
            : translate("FileExplorer_header_title")

        return (
            <Text
                variant={"titleLarge"}
                numberOfLines={1}
                ellipsizeMode={"head"}
                children={title}
                style={{ paddingRight: 16 }}
            />
        )
    }


    return (
        <Appbar.Header elevated={true} statusBarHeight={safeAreaInsets.top}>
            <Appbar.BackAction onPress={props.goBack} />

            <Appbar.Content title={<HeaderTitle />} />
        </Appbar.Header>
    )
}
