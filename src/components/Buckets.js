import React, {useState, useEffect} from "react";
import Bucket from "./Bucket";
import BucketObject from "./BucketObject";

const Buckets = ({s3}) => {
    const [bucketList, setBucketList] = useState([])
    const [objectList, setObjectList] = useState([])
    const [selectedBucket, setSelectedBucket] = useState(undefined)
    const [error, setError]  = useState(undefined)

    const getBuckets = async () => { // 버켓 리스트 가져오기
        try {
            const { Buckets } = await s3.listBuckets().promise()
            setBucketList(Buckets)
        }
        catch (err) {
            setError(err)
        }
    }

    useEffect(()=>{ // 첫 렌더링 때 버킷 가져오기
        getBuckets()
    }, [])

    const getListObject = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
            console.log(selectedBucket)
            const params = {
                Bucket: selectedBucket
            }
            const res = await s3.listObjects(params).promise()
            console.log(res)
            setObjectList(res.Contents)
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    const onClickHandler = (item) => { // 클릭시 state에 버킷 설정
        setSelectedBucket(item.Name)
    }

    useEffect(()=>{
        getListObject()
    }, [selectedBucket])
    
    return(
        <div className="Bucket">
            {
                selectedBucket == undefined ?
                bucketList.map((item, key)=> 
                    <Bucket key={key} item={item} setSelectedBucket={setSelectedBucket}/>)
                :
                objectList.map((item, key) => 
                    <BucketObject key={key} item={item} />
                )
            }
        </div>
    )
}

export default Buckets