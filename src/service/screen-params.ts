import { lockType } from "./object-type"


export type ScreenParams = {
    Lock: {
        action: undefined | "change-lock",
        passwordType: lockType,
    },
    Code: {
        noteId: number,
    },
    Read: {
        noteId: number,
        password: string,
    },
    FileExplorer: {
        action: "import" | "encrypt"
    },
    FileEncryption: {
        filePath: string,
    },
    AddPassword: {
        passwordType: lockType,
    },
}
