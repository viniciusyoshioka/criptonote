import { Note } from "./object-type"


export type ScreenParams = {
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
    ProcessingEncryption: {
        operation: "encrypt" | "decrypt",
        filePath: string,
        password: string,
        deleteOriginalFile: boolean,
    },
}
