import React, {useState, useEffect} from "react";

const Bucket = ({s3}) => {
    const [bucketList, setBucketList] = useState([])
    const [objectList, setObjectList] = useState([])
    const [Content, setContent] = useState([])
    const [selectedBucket, setSelectedBucket] = useState(undefined)
    const [selectedObject, setSelectedObject] = useState(undefined)
    const [deleteButton, setdeleteButton] = useState(undefined)
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




    const getContent = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
            console.log(selectedObject)
            const params_obj = {
                Bucket: selectedBucket,
                Key: selectedObject
            }
            const res = await s3.getObject(params_obj).promise()
            console.log(res)
            setContent(['Last modified: '+res.LastModified,<br/>,'content: '+res.Body.toString()])
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    const onClickHandler_obj = (item) => { // 클릭시 state에 버킷 설정
        setSelectedObject(item.Key)
    }

    useEffect(()=>{
        getContent()
    }, [selectedObject])











    const deleteObject = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
            console.log(deleteButton)
            const params_obj = {
                Bucket: selectedBucket,
                Key: deleteButton
            }
            await s3.deleteObject(params_obj,function(err,data){
                if(err&&err.statusCode!=403){}
                else alert('success')
            }).promise()
            }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    const onClickHandler_obj_del = (item) => { // 클릭시 state에 버킷 설정
        setdeleteButton(item.Key)
    }

    useEffect(()=>{
        deleteObject()
        getListObject()
    }, [deleteButton])
    






    return(
        <div className="Bucket">
            {
                selectedBucket == undefined ? 
                bucketList.map((item, key)=> 
                    <p 
                        key={key}
                        onClick={() => onClickHandler(item)}
                    >
                        {item.Name}
                    </p>)
                :
                (
                    selectedObject == undefined?
                    objectList.map((item, key) => 
                        <p
                            key={key}
                           
                        >
                            {item.Key}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={()=>onClickHandler_obj(item)}>content</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={()=>onClickHandler_obj_del(item)}>X</button>
                        </p>
                )
                :
                    Content
                )
            }
        </div>
    )
}

export default Bucket