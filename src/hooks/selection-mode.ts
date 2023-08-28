import { useState } from "react"
import { HandlerStateChangeEventPayload, LongPressGestureHandlerEventPayload, State } from "react-native-gesture-handler"


export function useSelectionMode<T>() {


    const [isSelectionMode, setIsSelectionMode] = useState(false)
    const [selectedData, setSelectedData] = useState<T[]>([])


    function selectItem(item: T) {
        if (!isSelectionMode) {
            setIsSelectionMode(true)
        }
        if (!selectedData.includes(item)) {
            setSelectedData(current => [...current, item])
        }
    }

    function deselectItem(item: T) {
        const index = selectedData.indexOf(item)
        if (index === -1) {
            return
        }

        const newSelectedData = [...selectedData]
        newSelectedData.splice(index, 1)
        setSelectedData(newSelectedData)

        if (isSelectionMode && newSelectedData.length === 0) {
            setIsSelectionMode(false)
        }
    }

    function exitSelection() {
        setIsSelectionMode(false)
        setSelectedData([])
    }


    return {
        isSelectionMode,
        setIsSelectionMode,
        selectedData,
        setSelectedData,
        selectItem,
        deselectItem,
        exitSelection,
    }
}


export interface SelectableItem {
    onClick: () => void;
    onSelect: () => void;
    onDeselect: () => void;
    isSelectionMode: boolean;
    isSelected: boolean;
}


export function useSelectableItem<T extends SelectableItem>(props: T) {


    function onPress() {
        if (!props.isSelectionMode) {
            props.onClick()
        } else if (!props.isSelected) {
            props.onSelect()
        } else if (props.isSelected) {
            props.onDeselect()
        }
    }

    function onLongPress(nativeEvent: Readonly<HandlerStateChangeEventPayload & LongPressGestureHandlerEventPayload>) {
        if (nativeEvent.state === State.ACTIVE) {
            if (!props.isSelectionMode) {
                props.onSelect()
            }
        }
    }


    return {
        onPress,
        onLongPress,
    }
}
