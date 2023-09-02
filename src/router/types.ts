import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { NoteSchema } from "@database"


// TODO Add other screens
export type ScreenParams = {
    Home: undefined;
    Code: {
        note: NoteSchema;
    };
    ReadNote: {
        note: NoteSchema;
    };
    WriteNote: undefined;
    Settings: undefined;
}


export type NavigationParamProps<T extends keyof ScreenParams> = NativeStackNavigationProp<ScreenParams, T>


export type RouteParamProps<T extends keyof ScreenParams> = RouteProp<ScreenParams, T>
