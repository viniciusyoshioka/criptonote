import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { DecryptedNote, SerializableNote } from "@database"


// TODO Add other screens
export type ScreenParams = {
    Home: undefined;
    Code: {
        note: SerializableNote;
    };
    ReadNote: {
        note: SerializableNote;
        password: string;
    };
    EditNote: {
        note: DecryptedNote;
        password: string;
    };
    WriteNote: undefined;
    Settings: undefined;
    ChangeTheme: undefined;
}


export type NavigationParamProps<T extends keyof ScreenParams> = NativeStackNavigationProp<ScreenParams, T>


export type RouteParamProps<T extends keyof ScreenParams> = RouteProp<ScreenParams, T>
