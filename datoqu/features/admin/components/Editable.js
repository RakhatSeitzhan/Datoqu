import React, { useEffect, useState } from 'react'
import EditableList from './EditableList'
import EditableText from './EditableText'
import { Button } from '@mui/material'
import { db } from '@/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useSelectedDoc } from '@/app/admin/courses/[courseId]/SelectedDocContext'
function Editable(docRef) {

    // displays selected document and makes such that
    // it is possible to edit the data
    const { selectedDoc, setSelectedDoc } = useSelectedDoc()
    // const data = await getDoc(docRef)
    // console.log(data)
    // console.log(selectedDoc)

    // const doc1 = {
    //     id: 'FH934hf2309gj2398',
    //     title: 'Some Problem title',
    //     contents: [
    //         {type: 'text', value: "Assume that there is an infinite amount of water in a reservoir"},
    //         {type: 'text', value: "Let m be the total area of the contact between the shape and atm"}
    //     ],
    //     answers: [
    //         'a',
    //         'b',
    //         'c',
    //         'd'
    //     ],
    //     correctAnswer: 'a'
    // }
    const normalizeAndCategorize = (obj) => {
        if (!obj) return []
        const keys = Object.keys(obj)
        return keys.map(k => {
            let type = typeof obj[k]
            if (Array.isArray(obj[k])) type = "array"
            return {key: k, type: type,value: obj[k]}
        })
    }
    // console.log('updated')
    const [ normalizedData, setNormalizedData ] = useState(normalizeAndCategorize(selectedDoc))
    useEffect(() => {
        setNormalizedData(normalizeAndCategorize(selectedDoc))
    }, [selectedDoc])
    const denormalize = (keyvalues) => {
        let res = {}
        keyvalues.forEach(element => {
            res[element.key] = element.value
        });
        return res
    }
    const save = () => {
        
    }
    // const normalizedData = normalizeAndCategorize(doc)
    console.log(normalizedData)
    return (
        <div>
            Editable
            {normalizedData.map((field, index) => {
                switch(field.type){
                    case 'array':
                        return <EditableList />
                    case 'string':
                        return <EditableText index = {index} normalizedData={normalizedData} setNormalizedData={setNormalizedData}/>
                }
            })}
            <Button onClick={save}>Submit</Button>
        </div>
    )
}

export default Editable
