import { Note } from "./object-type"


export type ScreenParams = {
    Code: {
        note: Note,
    },
    Read: {
        note: Note,
        password: string,
    },
}
