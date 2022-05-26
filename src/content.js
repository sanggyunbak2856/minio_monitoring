import React, {useState, useEffect} from "react";

const Content = ({s3}) => {
    const [bucketList, setBucketList] = useState([])
    const [objectList, setObjectList] = useState([])
    const [ContentList, setContentList] = useState([])
    const [selectedBucket, setSelectedBucket] = useState(undefined)
    const [selectedObject, setSelectedObject] = useState(undefined)
    const [error, setError]  = useState(undefined)


    const getListContent = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
            console.log(selectedObject)
            const params_obj = {
                Bucket: 'test1',
                Key: 'test.txt'
            }
            const res = await s3.getObject(params_obj).promise()
            console.log(res.Body.toString())
            setContentList(res.Body.toString())
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    const onClickHandler_obj = (item) => { // 클릭시 state에 버킷 설정
        setSelectedObject(item.Name)
    }

    useEffect(()=>{
        getListContent()
    }, [])
    
    return(
        <div className="Bucket">
            {
                
                ContentList
                
            }
        </div>
    )
}

export default Content