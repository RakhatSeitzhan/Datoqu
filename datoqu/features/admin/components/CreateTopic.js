import React, { useState } from 'react'
import { doc, setDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase';
import { TextField } from '@mui/material'
import { Button, IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
function CreateTopic({ course }) {
    const [ topicTitle, setTopicTitle] = useState('')
    const addTopic = async () => {
        const collectionRef = collection(db, `courses/${course.id}/topics`);
        await setDoc(doc(collectionRef), {
            title: topicTitle, 
            createdAt: serverTimestamp(),
        });
    }
    return (
    <div className='rouded-lg bg-white flex flex-col'>
        <TextField size = 'small' onChange={e => setTopicTitle(e.target.value)} value={topicTitle} placeholder='Topic title'></TextField>
        <Button onClick={addTopic} variant="text" startIcon={<SendRoundedIcon/>}>
            Submit
        </Button>
    </div>
  )
}

export default CreateTopic
