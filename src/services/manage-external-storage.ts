import { NativeModules, Platform } from "react-native"


type ExternalStorageType = {
    requestManageExternalStorage: () => Promise<void>
    isManageExternalStorageAllowed: () => Promise<boolean>
}


const ExternalStorageModule = NativeModules.ExternalStorageModule as ExternalStorageType


export const ExternalStorage = {
    requestManageExternalStorage: async () => {
        if (Platform.OS !== "android") return

        await ExternalStorageModule.requestManageExternalStorage()
    },
    isManageExternalStorageAllowed: async () => {
        if (Platform.OS !== "android") return false

        return await ExternalStorageModule.isManageExternalStorageAllowed()
    },
}
