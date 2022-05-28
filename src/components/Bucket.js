import React from "react";

const Bucket = ({item, setSelectedBucket}) => {
    return (
        <div onClick={() => setSelectedBucket(item.Name)}>
            <span>{item.Name}</span>
        </div>
    )
}

export default Bucket