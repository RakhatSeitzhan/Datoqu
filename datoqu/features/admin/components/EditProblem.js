'use server'
import React from 'react'
// import { db } from '@/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { TextField } from '@mui/material'
async function EditProblem() {
    // if (!docref) return <></>
    // console.log(docref)
    const docref = doc(db, 'courses/xtqyMWeNYmM57D6N4tNR/problems', 'JPh56yiLbZ6cB8DsPY4M')
    console.log(docref)
    const data = {} // await getDoc()
    // const data = await new Promise((res,rej) => setTimeout(() => {res({mes:'s'})}, 2000))
    console.log(data)
    return (
        <form>
            {/* <h2>Problem {docref.id}</h2> */}
            {data?.contents.map(content => {
                switch(content.type){
                    case 'text':
                        return <TextField defaultValue={content.value}></TextField>
                    case 'file':
                        // return <TextField defaultValue={content.value}></TextField>
                        return <div>file</div>
                }
            })}
            
        </form>
    )
}

export default EditProblem
