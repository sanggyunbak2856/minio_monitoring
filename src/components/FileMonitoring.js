import React, {useState, useEffect} from "react";
import Bucket from "./Bucket";
import BucketObject from "./BucketObject";
import ObjectContent from "./ObjectContent";
import '../App.css'
import ErrorDetection from "./ErrorDetection";

const FileMonitoring = ({s3}) => {
    const [bucketList, setBucketList] = useState([])
    const [objectList, setObjectList] = useState([])
    const [selectedBucket, setSelectedBucket] = useState(undefined)
    const [selectedObject, setSelectedObject] =  useState(undefined)
    const [objectForDelete, setObjectForDelete] = useState(undefined)
    const [contents, setContents] = useState(undefined)
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

    const deleteObject = async () => { // 객체 삭제
        try {
            const params = {
                Bucket: selectedBucket,
                Key: objectForDelete
            }
            console.log("selectedBucket : ", selectedBucket, "objectForDelete : ", objectForDelete)
            const res = await s3.deleteObject(params, (err, data) => console.log(data))
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    const getObjectContent = async () => { // object 내용 출력
        try {
            const params = {
                Bucket: selectedBucket,
                Key: selectedObject
            }
            const res = await s3.getObject(params).promise()
            const bodyRes = res.Body.toString()
            const messages = bodyRes.match(/\{(.*?)\}/g)
            setContents(messages)
        }
        catch (err) {
            setError(err)
        }
    }

    const onClickBackButtonHandler = () => { // 첫페이지로 가기
        setSelectedBucket(undefined)
        getBuckets()
    }

    const onClickRefreshButtonHandler = () => {
        selectedBucket == undefined ?
        getBuckets()
        :
        getListObject()
    }

    useEffect(()=>{ // 버킷 클릭시 오브젝트 리스트 가져오기
        getListObject()
    }, [selectedBucket])

    useEffect(() => {
        deleteObject()
        getListObject()
        setContents(undefined)
    }, [objectForDelete])

    useEffect(() => {
        getObjectContent()
    }, [selectedObject])
    
    return(
        <div className="Monitoring">
            <h1>File Monitoring</h1>
            <div className="button_wrapper">
                <button onClick={() => onClickRefreshButtonHandler()}>refresh</button>
                <button onClick={() => onClickBackButtonHandler()}>return to bucket list</button>
            </div>
            <div className="Bucket">
                {
                    selectedBucket == undefined ?
                    bucketList.map((item, key)=> 
                        <Bucket key={key} item={item} setSelectedBucket={setSelectedBucket}/>)
                    :
                    objectList.map((item, key) => 
                        <BucketObject 
                            key={key} 
                            item={item} 
                            setObjectForDelete={setObjectForDelete}
                            setSelectedObject={setSelectedObject}
                        />
                    )
                }
            </div>
            <hr></hr>
            <h1>File Contents</h1>
            <ObjectContent contents={contents}/>
            <hr/>
            <ErrorDetection contents={contents}/>
        </div>
    )
}

export default FileMonitoring