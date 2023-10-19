import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { DecryptedNote, SerializableNote } from "@database"


export type FileCodeAction = "encrypt" | "decrypt"


export type ScreenParams = {
    Home: undefined
    Code: {
        note: SerializableNote
    }
    ReadNote: {
        note: SerializableNote
        password: string
    }
    EditNote: {
        note: DecryptedNote
        password: string
    }
    ChangePassword: {
        noteId: string
        currentPassword: string
    }
    WriteNote: undefined
    Settings: undefined
    ChangeTheme: undefined

    FileHome: undefined
    FileCode: {
        fileName: string
        filePath: string
        action: FileCodeAction
    }
}


export type NavigationParamProps<T extends keyof ScreenParams> = NativeStackNavigationProp<ScreenParams, T>


export type RouteParamProps<T extends keyof ScreenParams> = RouteProp<ScreenParams, T>
