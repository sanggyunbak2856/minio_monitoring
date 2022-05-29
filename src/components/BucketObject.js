import React from "react"
import "../App.css"

const BucketObject = ({item, setObjectForDelete, setSelectedObject}) => {
    return(
        <div 
            className="BucketObject"
            onClick={() => setSelectedObject(item.Key)}
        >
            <span>{item.Key}</span>
            <span>{item.LastModified.toString()}</span>
            <button onClick={() => setObjectForDelete(item.Key)}>delete</button>
        </div>
    )
}

export default BucketObject