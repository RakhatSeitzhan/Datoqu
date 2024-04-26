'use client';
import React, { useState } from 'react'
import Latex from 'react-latex-next';
import "katex/dist/katex.min.css";
import Edit from './Edit';
import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
function Problems({problems, courseId}){
    const [selectedProblem , setSelectedProblem] = useState()
    const updateSelectedDoc = (problem) => {
        const docref = doc(db, `courses/${courseId}/problems`,problem.id)
        setSelectedProblem(docref)
    }
    return (
      <div>
        {problems.map((problem, index) => 
        <div onClick={()=>updateSelectedDoc(problem)} key={index} className='hover:bg-gray-50'>
            {problem.contents.map((content, i) => {
                if (content.type == 'text')
                    return <Latex key = {i}>{content.value}</Latex>
                if (content.type == 'file')
                    return <img key = {i} src={content.value}></img>
            })}
            <div className='flex flex-col gap-y-2'>
                {problem.options.map((option, id) => <Latex key = {id}>{option}</Latex>)}
            </div>
        </div>
        )}
        {/* <Edit docref={selectedProblem}></Edit> */}
      </div>
      
    )
  }
  

export default Problems
