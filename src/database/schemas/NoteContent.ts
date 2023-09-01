import { Realm } from "@realm/react"

import { NoteContentRealm } from "@database/interfaces"


export class NoteContentSchema extends Realm.Object<NoteContentSchema> implements NoteContentRealm {
    id = new Realm.BSON.ObjectId()
    text!: string

    static primaryKey = "id"
}
