import React, { useEffect, useState } from 'react'
import {  getDocs, collection, doc} from 'firebase/firestore'
import { db } from '@/firebase'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import Latex from 'react-latex-next';
import "katex/dist/katex.min.css";
import { ListItemButton } from '@mui/material'
import CreateProblem from '@/features/admin/components/CreateProblem'
import { useSelectedDoc } from '@/app/admin/courses/[courseId]/SelectedDocContext';

function ProblemsList({ course }){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [problems, setProblems ] = useState([])
    const [loading, setLoading] = useState(false)
    const { selectedDoc, setSelectedDoc } = useSelectedDoc()
    useEffect(() => {
        queryProblems()
    }, [])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
      };
    const queryProblems = async () => {
        const collectionRef = collection(db, `courses/${course.id}/problems`);
        const querySnap =  await getDocs(collectionRef)
        setProblems(querySnap.docs.map(doc => ({...doc.data(), id: doc.id})))
        setLoading(false)
    }
    const updateSelecetedDoc = (problemId) => {
        const docref = doc(db, `courses/${course.id}/problems`, problemId)
        setSelectedDoc(docref)
    }
    return (
    <div className='w-full border border-gray-300'>
        <Button onClick={handleOpen} variant="text" startIcon={<AddRoundedIcon/>}>
            Add a problem
        </Button>
        <div>
            {problems.map((problem, index) => 
            <div onClick={() => updateSelecetedDoc(problem.id)} key={index} className='hover:bg-gray-50'>
                {problem.contents.map((content, i) => {
                    if (content.type == 'text')
                        return <Latex key = {i}>{content.value}</Latex>
                    if (content.type == 'file')
                        return <img key = {i} src={content.value}></img>
                })}
                <div className='flex flex-col gap-y-2'>
                    {problem.options.map(option => <Latex>{option}</Latex>)}
                </div>
                
            </div>
            // <ListItemButton key={index}>abs</ListItemButton>
            )}
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CreateProblem course = {course}/>
            </Box>
        </Modal>
    </div>
    )
}

export default ProblemsList
