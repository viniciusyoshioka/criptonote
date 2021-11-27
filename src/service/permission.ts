import { PermissionsAndroid } from "react-native"


export type LogPermissionResult = {
    WRITE_EXTERNAL_STORAGE: boolean,
    READ_EXTERNAL_STORAGE: boolean,
}

export async function getLogPermission(): Promise<LogPermissionResult> {
    const hasWritePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    const hasReadPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
    if (hasWritePermission && hasReadPermission) {
        return {
            WRITE_EXTERNAL_STORAGE: true,
            READ_EXTERNAL_STORAGE: true
        }
    }

    const status = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ])

    return {
        WRITE_EXTERNAL_STORAGE: status["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted",
        READ_EXTERNAL_STORAGE: status["android.permission.READ_EXTERNAL_STORAGE"] === "granted"
    }
}


export async function getReadPermission(): Promise<boolean> {
    const hasPermission = await PermissionsAndroid.check("android.permission.READ_EXTERNAL_STORAGE")
    if (!hasPermission) {
        const requestedPermission = await PermissionsAndroid.request("android.permission.READ_EXTERNAL_STORAGE")
        return requestedPermission === "granted"
    }
    return true
}


export async function getWritePermission(): Promise<boolean> {
    const hasPermission = await PermissionsAndroid.check("android.permission.WRITE_EXTERNAL_STORAGE")
    if (!hasPermission) {
        const requestedPermission = await PermissionsAndroid.request("android.permission.WRITE_EXTERNAL_STORAGE")
        return requestedPermission === "granted"
    }
    return true
}
