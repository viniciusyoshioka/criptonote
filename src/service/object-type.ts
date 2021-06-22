
// Note
export type Note = {
    id: number,
    title: string,
    text: string,
    lastModificationDate: string,
}

export type ExportedNote = {
    title: string,
    text: string,
}


// Debug Home
export type debugHome = "show" | "hide"
export const debugHomeDefault: debugHome = "show"


// Lock type
export type lockType = "none" | "pin" | "text" | "bio"
export const lockTypeDefault: lockType = "none"
