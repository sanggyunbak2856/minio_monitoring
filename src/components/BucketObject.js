import React from "react"

const BucketObject = ({item, setSelectedObject}) => {
    return(
        <div>
            <span>{item.Key}</span>
            <button onClick={() => setSelectedObject(item.Key)}>delete</button>
        </div>
    )
}

export default BucketObject