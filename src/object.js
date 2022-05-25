import React, {useState, useEffect} from "react";

const Object = ({s3}) => {
    const [objectList, setobjectList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const getObjects = async () => {
        let list=[];
        try {
            const Buckets  = await s3.listObjectsV2({Bucket:"test1"}).promise()
        
            list = Buckets.Contents.map(item => item.Key)
            setobjectList(list)
            console.log(objectList)
            console.log(list)
        }
        catch (err) {
            setError(err)
        }
    }

    useEffect(()=>{
        getObjects()
    }, [])
    
    return(
        <div className="Object">
            {
                objectList.map((item, key)=> <p key={key}>{item}</p>)
            }
        </div>
    )
}

export default Object