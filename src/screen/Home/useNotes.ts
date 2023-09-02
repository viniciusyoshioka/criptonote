import { useEffect, useState } from "react"
import { CollectionChangeCallback } from "realm"

import { NoteSchema, useNoteRealm } from "@database"


type NotesChanges = CollectionChangeCallback<NoteSchema, [number, NoteSchema]>


export function useNotes(): NoteSchema[] {


    const noteRealm = useNoteRealm()
    const noteSchemas = noteRealm.objects(NoteSchema).sorted("modifiedAt", true)

    const [notes, setNotes] = useState(noteSchemas)


    const onChange: NotesChanges = (notes, changes) => {
        const hasDeletion = changes.deletions.length > 0
        const hasInsertion = changes.insertions.length > 0
        const hasNewModifications = changes.newModifications.length > 0
        const hasOldModifications = changes.oldModifications.length > 0

        if (hasDeletion || hasInsertion || hasNewModifications || hasOldModifications) {
            const newNotes = noteRealm
                .objects(NoteSchema)
                .sorted("modifiedAt", true)
            setNotes(newNotes)
        }
    }


    useEffect(() => {
        noteSchemas.addListener(onChange)

        return () => noteSchemas.removeListener(onChange)
    })


    return notes.toJSON() as unknown as NoteSchema[]
}
