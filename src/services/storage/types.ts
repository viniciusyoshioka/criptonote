
export enum AppStorageKeys {
    SETTINGS = "settings",
}


export type MMKVHook<T> = [
    value: T | undefined,
    setValue: (value: T | ((current: T | undefined) => T | undefined) | undefined) => void
]
