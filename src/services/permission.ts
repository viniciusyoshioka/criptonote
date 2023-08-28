import { Permission, PermissionsAndroid, Platform } from "react-native"


// TODO request permission for Android and iOS


export async function getPermission(permission: Permission): Promise<boolean> {
    const hasPermission = await PermissionsAndroid.check(permission)
    if (!hasPermission) {
        const requestedPermission = await PermissionsAndroid.request(permission)
        return requestedPermission === "granted"
    }
    return true
}


export async function getReadPermission(): Promise<boolean> {
    if (Platform.OS === "android" && Platform.Version >= 33) return true
    return await getPermission("android.permission.READ_EXTERNAL_STORAGE")
}


export async function getWritePermission(): Promise<boolean> {
    if (Platform.OS === "android" && Platform.Version >= 33) return true
    return await getPermission("android.permission.WRITE_EXTERNAL_STORAGE")
}


export async function getNotificationPermission(): Promise<boolean> {
    if (Platform.OS === "android" && Platform.Version < 33) return true
    return await getPermission("android.permission.POST_NOTIFICATIONS")
}
