import TextField from '@mui/material/TextField';
import React, {useState, useEffect} from "react";


const BucketOper = ({s3}) => {
    const [bucketname,setbucketname]=useState('')
    const [submitted,setsubmitted]=useState('')
    const [error, setError]  = useState(undefined)


    const handleChange=({target:{value}})=>setbucketname(value)

    const handleSubmit=(event)=>{
        setsubmitted(bucketname)
    }





    const makebucket = async () => { // 버킷들 public 권한 가지고 있어야함
        try {
            console.log(submitted)
            var params={
                Bucket: submitted
            }
            await s3.createBucket(params,function(err,data){
                if(err) console.log(err,err.stack);
                else console.log(data)
            }).promise()
            
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    useEffect(()=>{
        makebucket()
    }, [submitted])



    return(
        <div className="Bucket">
            <form onSubmit={handleSubmit}>
                <input
                type='bucketname'
                name='bucketname'
                value={bucketname}
                onChange={handleChange}
                >
                </input>
                <button type="submit">create</button>
            </form>
            
        </div>
    )
    }
    
    export default BucketOper
