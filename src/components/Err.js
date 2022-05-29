import React, {useState, useEffect} from "react";



const Err = ({s3}) => {
    
    const [bucketList, setBucketList] = useState([])
    const [objectList, setObjectList] = useState([])
    const [Content, setContent] = useState([])
    const [selectedBucket, setSelectedBucket] = useState([])
    const [selectedObject, setSelectedObject] = useState(undefined)
    const [deleteButton, setdeleteButton] = useState(undefined)
    const [error, setError]  = useState(undefined)



    const getContent = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
             await objectList.map(async(item, key)=> 
                 {
                    const params_obj = {
                        Bucket: 'test1',
                        Key: item
                    }
                    const res =  await s3.getObject(params_obj).promise()
                    var s=res.Body.toString()
                    s=s.match(/\".*\"/gi);
                    s+="";
                    s=s.replace(/\"message\":/g,"")
                    s=s.replace(/\"/g,"")
                    
                    var i=s.split(" ").map(Number)
                    i=i.slice(1,-1)
                    console.log(i)
                    var iserr=false;
                    await i.map((a,key)=>{
                        if(a==50){iserr=true}
                    }
                    )
                    if(iserr==true){
                        setSelectedBucket([...selectedBucket,item])
                        iserr=false
                    }
                 }).promise()
            
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }
    
    const onClickHandler_obj = (item) => { // 클릭시 state에 버킷 설정
        setObjectList(["20220529_0.json","20220529_1.txt","20220529_0.txt","20220529_2.txt"])
    }
    
    useEffect(()=>{
        getContent()
    }, [objectList])
    
 
    


    return(
        <div className="Bucket">
            <button onClick={onClickHandler_obj}>
                asdasd
            </button>
            {
            selectedBucket.map((item, key)=> 
                    <p 
                    >
                        {item}
                    </p>)}
        </div>
    )
    }
    
    export default Err
