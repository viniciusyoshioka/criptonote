import { Realm } from "@realm/react"

import { NoteContentSchema, NoteSchema } from "../schemas"


export async function openExportedDatabase(path: string) {
    return await Realm.open({
        schema: [NoteSchema, NoteContentSchema],
        schemaVersion: 1,
        path,
        deleteRealmIfMigrationNeeded: __DEV__,
    })
}
