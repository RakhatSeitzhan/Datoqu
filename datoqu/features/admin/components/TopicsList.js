import React, { useEffect, useState } from 'react'
import { getDocs, collection  } from 'firebase/firestore'
import { db } from '@/firebase'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';

import { ListItemButton } from '@mui/material'
import CreateTopic from './CreateTopic';
import { useSelectedDoc } from '@/app/admin/courses/[courseId]/SelectedDocContext';

function TopicsList({ course, setCourse }) {
    const [topics, setTopics] = useState([])
    const { selectedDoc, setSelectedDoc } = useSelectedDoc()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
      };
    const queryTopics = async () => {
        const collectionRef = collection(db, `courses/${course.id}/topics`);
        const querySnap =  await getDocs(collectionRef)
        const topics = querySnap.docs.map(doc => ({...doc.data(), id: doc.id}))
        setTopics(topics)
        setCourse({...course, topics: topics})
        // setLoading(false)
    }
    const updateSelectedDoc = (topic) => {
        setSelectedDoc(topic)
    }
    useEffect(() => {
        queryTopics()
    }, [])
  return (
    <div className='w-full border border-gray-300'>
        <Button onClick={handleOpen} variant="text" startIcon={<AddRoundedIcon/>}>
            Add a topic
        </Button>
        <List>
        {topics.map((topic, index) => 
            <ListItemButton onClick={() => updateSelectedDoc(topic)} key={index}>{topic.title}</ListItemButton>
        )}
        </List>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rouded-lg">
                <CreateTopic course = {course}/>
            </Box>
        </Modal>
    </div>
  )
}

export default TopicsList
