import { Realm } from "@realm/react"


export interface NoteContentRealm {
    id: Realm.BSON.ObjectId;
    text: string;
}
