'use server'
import React from 'react'
import { db } from '@/firebase'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { redirect } from 'next/navigation';

import Problems from './Problems';

export default async function TestPage({ params }) {

  const courseSnap = await getDoc(doc(db, 'courses', params.courseId))
  if (!courseSnap.exists()) redirect('/test')
  const course = {...courseSnap.data(), id: courseSnap.id}

  const problemsSnap = await getDocs(collection(db, `courses/${courseSnap.id}/problems`))
  const problems = problemsSnap.docs.map(problemSnap => ({...problemSnap.data(), id:problemSnap.id}))
  
  return (
    <div>
      <Problems problems={problems}></Problems>
      
    </div>
  )
}
function EditProblem(){

}
