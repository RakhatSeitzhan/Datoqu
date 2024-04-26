import React from 'react'
import { db } from '@/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { TextField } from '@mui/material'

function CreatePractice() {
    const addPracticeToDb = async (formData) => {

    }
    
    return (
        <div>
            <form action={addPracticeToDb}>
                <TextField size="small" defaultValue="Title" name='title'></TextField>
            </form>
        </div>
    )
}

export default CreatePractice
