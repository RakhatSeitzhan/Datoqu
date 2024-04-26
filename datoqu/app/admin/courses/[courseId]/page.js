'use client'
import React, { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import TopicsList from '@/features/admin/components/TopicsList'
import ProblemsList from '@/features/admin/components/ProblemsList'
import Editable from '@/features/admin/components/Editable'
import { SelectedDocProvider } from './SelectedDocContext'
import EditProblem from '@/features/admin/components/EditProblem'
import { Suspense } from 'react'
function CoursePage({ params }) {   
    const [ loading, setLoading ] = useState(true)
    const [ course, setCourse ] = useState([])
    const [ selectedDoc, setSelectedDoc ] = useState()
    // const { selectedDoc, setSelectedDoc } = useSelectedDoc()
    const router = useRouter()
    const queryCourse = async () => {
        const docRef = doc(db, "courses", params.courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setCourse({...docSnap.data(), id: params.courseId})
            setLoading(false)
        } else {
            router.push('/admin/courses')
        }
    }
    useEffect(() => {
        queryCourse()
    }, [])
    return !loading ? (
        <SelectedDocProvider value = {{selectedDoc, setSelectedDoc}}>
            <div>
                <h2>{course.title}</h2>
                <div className='flex bg-gray-50'>
                    <div className='w-full border border-gray-300'>Topics</div>
                    <div className='w-full border border-gray-300'>Problems</div>
                    <div className='w-full border border-gray-300'></div>
                </div>
                <div className='flex'>
                    <div className='w-full border border-gray-300'>
                        <TopicsList course = {course} setCourse = {setCourse}/>
                    </div>
                    <div className='w-full border border-gray-300'>
                        <ProblemsList course = {course}/>
                    </div>
                    <div className='w-full border border-gray-300'>c</div>
                </div>
                <div className='flex flex-col w-fit'>
                    {/* <Editable></Editable> */}
                    <Suspense>
                        <EditProblem docref = {selectedDoc}></EditProblem>
                    </Suspense>
                </div>
            </div>
        </SelectedDocProvider>
    ) : <></>
}



export default CoursePage
