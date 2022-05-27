import React, {useState, useEffect} from "react";


const BucketOper = ({s3}) => {
    const [createbucketname,setcreatebucketname]=useState('')
    const [submitted,setsubmitted]=useState('')
    const [deletebucketname,setdeletebucketname]=useState('')
    const [submitted_del,setsubmitted_del]=useState('')
    const [cerror, setcError]  = useState(undefined)
    const [derror, setdError]  = useState(undefined)

    
    const handleChange=({target:{value}})=>setcreatebucketname(value)
    const handleChange_del=({target:{value}})=>setdeletebucketname(value)

    const handleSubmit=(event)=>{
        setsubmitted(createbucketname)
    }
    const handleSubmit_del=(event)=>{
        setsubmitted_del(deletebucketname)
    }




    const makebucket = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
            console.log(submitted)
            var params={
                Bucket: submitted
            }
            await s3.createBucket(params,function(err,data){
                if(err&&err.statusCode==409) alert('Bucket has been created already');
                else if(submitted==''||err.statusCode==403||err.statusCode==404){}
            }).promise()
            
        }
        catch (err) {
            setcError(err)
            console.log(err)
        }
    }

    useEffect(()=>{
        makebucket()
    }, [submitted])





    const removebucket = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
            console.log(submitted_del)
            var params={
                Bucket: submitted_del
            }
            await s3.deleteBucket(params,function(err,data){
                if(err) {
                    if(err.statusCode==404) alert('bucket does not exist')
                    else if(err.statusCode==409) alert('bucket no empty')
    
                }
            }).promise()
            
        }
        catch (err) {
            setdError(err)
            console.log(err)
        }
    }

    useEffect(()=>{
        removebucket()
    }, [submitted_del])



    return(
        <div className="Bucket">
            bucket create
            <form onSubmit={handleSubmit}>
                <input
                type='bucketname'
                name='bucketname'
                value={createbucketname}
                onChange={handleChange}
                >
                </input>
                <button type="submit">create</button>
            </form>
            
            bucket delete
            <form onSubmit={handleSubmit_del}>
                <input
                type='bucketname'
                name='bucketname'
                value={deletebucketname}
                onChange={handleChange_del}
                >
                </input>
                <button type="submit">delete</button>
            </form>
        </div>
    )
    }
    
    export default BucketOper
