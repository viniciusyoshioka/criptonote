import { Realm } from "@realm/react"

import { NoteRealm } from "../interfaces"


export class NoteSchema extends Realm.Object<NoteSchema> implements NoteRealm {
    id = new Realm.BSON.ObjectId()
    createdAt: number = Date.now()
    modifiedAt: number = Date.now()
    title!: string
    text!: string

    static primaryKey = "id"
}
