'use client'
import React, { useState } from 'react'
import  TextField from '@mui/material/TextField'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, IconButton } from '@mui/material';

import { db } from '@/firebase';
import { collection, doc, setDoc, serverTimestamp} from "firebase/firestore"; 

function CreateCourse() {
    const [title, setTiltle] = useState('')
    const [ topics, setTopics] = useState([''])
    const updateTopic = (e, index) => {
        let temp = [...topics]
        temp[index] = e.target.value
        setTopics(temp)
    }
    const addTopic = () => {
        setTopics([...topics, ''])
    }
    const upload = async () => {
        const collectionRef = collection(db, "courses");
        await setDoc(doc(collectionRef), {
            title: title, 
            createdAt: serverTimestamp(),
            topics: topics
        });
    }
    return (
        <div className='flex flex-col w-fit rounded p-4 shadow-md gap-2'>
            <h1>Create course</h1>
            <TextField size = 'small' onChange={e => setTiltle(e.target.value)} value={title} placeholder='Course title'></TextField>
            <h2>Indicate all the topics</h2>
            {topics.map((topic, index) => 
                <TextField key = {index} placeholder={`Topic ${index+1}`} size = 'small' onChange={e => updateTopic(e, index)} value = {topic}></TextField>
            )}
            <div>
                <IconButton onClick={addTopic}>
                    <AddRoundedIcon/>
                </IconButton>
                Add a topic
            </div>
            <Button onClick={upload}>Submit</Button>
        </div>
    )
}

export default CreateCourse
