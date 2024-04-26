import React from 'react'
import { TextField } from '@mui/material'
function EditableText({ index, setNormalizedData, normalizedData}) {
    const value = normalizedData[index].value
    const key = normalizedData[index].key
    const update = (e) => {
        let temp = [...normalizedData]
        temp[index].value = e.target.value
        setNormalizedData(temp)
    }
    return (
        <div>
            <h2>{key}</h2>
            <TextField
                size='small'
                value={value}
                onChange={update}
            />
        </div>
       
    )
}

export default EditableText
