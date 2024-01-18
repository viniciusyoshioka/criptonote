import { List } from "react-native-paper"

import { DateService } from "@services/date"


export interface FileItemProps {
    name: string
    lastModified: Date | undefined
    isFile: boolean
    onPress?: () => void
}


export function FileItem(props: FileItemProps) {


    function getIcon() {
        if (props.isFile)
            return <List.Icon icon={"file-outline"} />
        return <List.Icon icon={"folder-outline"} />
    }

    function getLastModified() {
        if (!props.lastModified) return undefined
        return DateService.getLocaleDateTime(props.lastModified, false)
    }


    return (
        <List.Item
            left={() => getIcon()}
            title={props.name}
            description={getLastModified()}
            onPress={props.onPress}
            style={{ paddingLeft: 16 }}
        />
    )
}
