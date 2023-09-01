import { Realm } from "@realm/react"


export interface NoteRealm {
    id: Realm.BSON.ObjectId;
    createdAt: number;
    modifiedAt: number;
    title: string;
    textId: Realm.BSON.ObjectId;
}
