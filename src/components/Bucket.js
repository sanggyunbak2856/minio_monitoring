import React, {useState, useEffect} from "react";

const Bucket = ({s3}) => {
    const [bucketList, setBucketList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const getBucketLists = async () => {
        const res = await s3.listBuckets().promise()
        const buckets = res.Buckets
        console.log(buckets)
        setBucketList([...buckets])
    }

    useEffect(()=>{
        s3.listBuckets((err, data) => {
            if (err) {
                setError(true)
                return
            }
            setIsLoading(false)
            setBucketList(data.Buckets)
        })
    }, [])

    return(
        <div>
            hello world
            <div>
                {isLoading && "Loading"}
                {!isLoading && 
                    bucketList.map((item, key) => {
                        <p key={key}>{item.Name}</p>
                    })}
            </div>
        </div>
    )
}

export default Bucket