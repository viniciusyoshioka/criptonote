import { lockType, Note } from "./object-type"


export type ScreenParams = {
    Lock: {
        action: undefined | "change-lock",
        passwordType: lockType,
    },
    Code: {
        note: Note,
    },
    Read: {
        note: Note,
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
