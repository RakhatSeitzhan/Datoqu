'use server';
import React from 'react'
import { db } from '@/firebase'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
async function Edit(props) {
    if (!props.docref) return <></>
    const docref = props.docref
    const problemSnap = getDoc(docref)

    return (
        <div>
            Problem
        </div>
    )
}

export default Edit
