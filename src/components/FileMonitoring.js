import React, {useState, useEffect} from "react";
import Bucket from "./Bucket";
import BucketObject from "./BucketObject";
import '../App.css'

const FileMonitoring = ({s3}) => {
    const [bucketList, setBucketList] = useState([])
    const [objectList, setObjectList] = useState([])
    const [selectedBucket, setSelectedBucket] = useState(undefined)
    const [selectedObject, setSelectedObject] =  useState(undefined)
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

    const deleteObject = async () => {
        try {
            const params = {
                Bucket: selectedBucket,
                Key: selectedObject
            }
            console.log("selectedBucket : ", selectedBucket, "selectedObject : ", selectedObject)
            const res = await s3.deleteObject(params, (err, data) => console.log(data))
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    useEffect(()=>{ // 버킷 클릭시 오브젝트 리스트 가져오기
        getListObject()
    }, [selectedBucket])

    useEffect(() => {
        deleteObject()
        getListObject()
    }, [selectedObject])
    
    return(
        <div className="Monitoring">
            <h1>File Monitoring</h1>
            <div className="Bucket">
                {
                    selectedBucket == undefined ?
                    bucketList.map((item, key)=> 
                        <Bucket key={key} item={item} setSelectedBucket={setSelectedBucket}/>)
                    :
                    objectList.map((item, key) => 
                        <BucketObject key={key} item={item} setSelectedObject={setSelectedObject}/>
                    )
                }
            </div>
        </div>
    )
}

export default FileMonitoring