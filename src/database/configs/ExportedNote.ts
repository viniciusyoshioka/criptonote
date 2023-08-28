import { Realm } from "@realm/react"

import { NoteSchema } from "../schemas"


export async function openExportedDatabase(path: string) {
    return await Realm.open({
        schema: [NoteSchema],
        schemaVersion: 1,
        path,
        deleteRealmIfMigrationNeeded: __DEV__,
    })
}
