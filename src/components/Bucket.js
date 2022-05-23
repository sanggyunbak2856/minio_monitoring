import React, {useState, useEffect} from "react";

const Bucket = ({s3}) => {
    const [bucketList, setBucketList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const getBuckets = async () => {
        try {
            const { Buckets } = await s3.listBuckets().promise()
            setBucketList(Buckets)
        }
        catch (err) {
            setError(err)
        }
    }

    useEffect(()=>{
        getBuckets()
    }, [])
    
    return(
        <div className="Bucket">
            {
                bucketList.map((item, key)=> <p key={key}>{item.Name}</p>)
            }
        </div>
    )
}

export default Bucket