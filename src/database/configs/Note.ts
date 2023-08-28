import { createRealmContext } from "@realm/react"

import { Constants } from "@services/constant"
import { NoteSchema } from "../schemas"


const NoteRealmContext = createRealmContext({
    schema: [NoteSchema],
    schemaVersion: 1,
    path: Constants.appDatabaseFullPath,
    deleteRealmIfMigrationNeeded: __DEV__,
})

export const {
    RealmProvider: NoteRealmProvider,
    useRealm: useNoteRealm,
    useObject: useNoteObject,
    useQuery: useNoteQuery,
} = NoteRealmContext
