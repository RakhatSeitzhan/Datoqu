'use client'
import React, { useState } from 'react'
import  TextField from '@mui/material/TextField'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { doc, setDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
function CreateProblem({ course }) {
  const [ options, setOptions ] = useState([''])
  const [ selectedTopics, setSelectedTopics ] = useState(['default'])
  const [ contents, setContents ] = useState([{type: 'text', value: ''}]) // {type: 'text/image'}
  const addOption = (e) => {
      setOptions([...options, ''])
  }
  const [correctAnswers, setCorrectAnswers] = useState([''])
  const addAnswer = e => {
      setCorrectAnswers([...correctAnswers, ''])
  }
  const updateAnswer = (e, index) => {
      let temp = [...correctAnswers]
      temp[index] = e.target.value
      setCorrectAnswers(temp)
  }
  const updateOption = (e, index) => {
      let temp = [...options]
      temp[index] = e.target.value
      setOptions(temp)
  }
  const handleSubmit = async () => {
      const collectionRef = collection(db, `courses/${course.id}/problems`);
      const problemRef = doc(collectionRef)
      await setDoc(problemRef, {
          contents: contents,
          options: options, 
          relatedTopics: selectedTopics,
          correctAnswers: correctAnswers,
          createdAt: serverTimestamp(),
      });
      addProblemToTopic(course.id,problemRef.id)
  }
  const handleSelectChange = (e, index) => {
    let temp = [...selectedTopics]
    temp[index] = e.target.value
    setSelectedTopics(temp)
  }
  const addSelect = () => {
    setSelectedTopics([...selectedTopics, 'default'])
  }
  const handleTextContentChange = (e, index) => {
    let temp = [...contents]
    temp[index].value = e.target.value
    setContents(temp)
  }
  const handleImageContentChange = (e,index) => {
    let temp = [...contents]
    temp[index].value = e.target.files[0]
    setContents(temp)
  }
  const updateContentType = (e, index) => {
    let temp = [...contents]
    temp[index].type = e.target.value
    setContents(temp)
  }
  const addContent = () => {
    setContents([...contents, {type: 'text', value:''}])
  }
  const addProblemToTopic = (courseId, problemId) => {
    selectedTopics.map(async (item) => {
      const index = course.topics.findIndex(i => i.title == item)
      if (index != -1){
        const ref = doc(db, `courses/${courseId}/topics`, course.topics[index].id)
        await updateDoc(ref, {problems: [problemId]})
      }
    })
  }
  return (
  <div className='flex flex-col rounded overflow-hidden shadow-md gap-2 bg-white pb-4'>
      <h1 className='bg-gray-200 p-2'>Create a problem</h1>
      {contents.map((section, index) => 
      <div>
        <Select onChange={e => updateContentType(e,index)} value = {section.type}>
          <MenuItem value = 'text'>Text</MenuItem>
          <MenuItem value = 'file'>File</MenuItem>
        </Select>
        {section.type == 'text' && 
        <textarea onChange={e => handleTextContentChange(e, index)} value={section.value}></textarea>
        }
        {section.type == 'file' && 
        <input type='file' onChange={e => handleImageContentChange(e, index)} value={section.value}></input>
        }
      </div>
      )}
      <div>
          <IconButton onClick={addContent}>
              <AddRoundedIcon/>
          </IconButton>
          Add more
      </div>
      {options.map((option, index) => 
          <TextField key = {index} onChange={e => updateOption(e,index)} size='small' placeholder={`Option ${index+1}`} value={option}></TextField>
      )}
      <div>
          <IconButton onClick={addOption}>
              <AddRoundedIcon/>
          </IconButton>
          Add an option
      </div>
      {correctAnswers.map((answer, index) => 
          <TextField key = {index}  onChange={e => updateAnswer(e,index)} size='small' placeholder={`Correct answer ${index+1}`} value={answer}></TextField>
      )}
      <div>
          <IconButton onClick={addAnswer}>
              <AddRoundedIcon/>
          </IconButton>
          Add an answer
      </div>
      {selectedTopics.map((selectedTopic, index) => 
      <Select
        key = {index}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedTopic}
        label="Topic"
        onChange={e => handleSelectChange(e, index)}
      >
        <MenuItem value='default'>Select related topics</MenuItem>
        {course.topics.map((topic, id) => <MenuItem key ={id} value={topic.title}>{topic.title}</MenuItem>)}
      </Select>
      )}
      <Button onClick={addSelect} variant="text" startIcon={<AddRoundedIcon/>}>
          Add more
      </Button>
      <Button onClick={handleSubmit} variant="text" startIcon={<SendRoundedIcon/>}>
          Submit
      </Button>
  </div>
  )
}

export default CreateProblem
