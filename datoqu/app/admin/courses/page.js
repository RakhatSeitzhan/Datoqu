'use client'
import React, { useEffect, useState } from 'react'
import CreateCourse from '@/features/admin/components/CreateCourse'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import Link from 'next/link';


function CourseList() {
    const [ loading, setLoading ] = useState(true)
    const [ courses, setCourses ] = useState([])
    const queryCourses = async () => {
        const q = query(collection(db, "courses"));
        const querySnapshot = await getDocs(q);
        setCourses(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        setLoading(false)
    }
    useEffect(() => {
        queryCourses()
    }, [])
    return (
        <div>
            <h2>Available Courses</h2>
            <div className='mb-8'>
                {courses.map((course, index) => 
                <Link href = {`courses/${course.id}`} key = {index} 
                    className='rouded shadow-md flex flex-col w-fit gap-2 p-4 cursor-pointer hover:bg-blue-50 transition-duration-50 transition-all'>
                    <h1>{course.title}</h1>
                </Link>
                )}
            </div>

            <CreateCourse/>
        </div>
    )
}

export default CourseList
