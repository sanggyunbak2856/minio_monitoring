import React, {useState, useEffect} from "react";

const Bucket = ({s3}) => {
    const [bucketList, setBucketList] = useState([])

    const getBucketLists = async () => {
        const res = await s3.listBuckets().promise()
        const buckets = res.Buckets
        console.log(buckets)
        setBucketList([...buckets])
    }

    useEffect(()=>{
        getBucketLists()
    }, [])

    return(
        <div>
            hello world
            <div>
                {
                    bucketList.map((item, key) => {
                        <p key={key}>{item.Name}</p>
                    })
                }
            </div>
        </div>
    )
}

export default Bucket