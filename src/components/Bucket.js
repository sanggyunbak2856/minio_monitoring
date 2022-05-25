import React from "react"

const Bucket = ({setSelectedBucket, item}) => {
    return(
        <div
            onClick={()=>{setSelectedBucket(item.Name)}}
        >
            <p>{item.Name}</p>
        </div>
    )
}

export default Bucket