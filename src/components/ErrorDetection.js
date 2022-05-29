import React, {useState, useEffect} from "react"
import '../App.css'

const ErrorDetection = ({contents}) => {
    const [error, setError] = useState(false)

    const errorDetect = () => {
        console.log("contents : ", contents)
        contents?.forEach(m => {
            console.log("m : ", m)
            const contentArr = JSON.parse(m).message.split(" ")
            contentArr.shift()
            console.log("content arr", contentArr)
            contentArr.forEach(e => {
                const i = Number(e)
                if(i < 10 || i > 50) {
                    console.log("here")
                    setError(true)
                }
            })
        });
    }

    useEffect(()=>{
        console.log("error", error)
    }, [error])

    return (
        <div className="ErrorDetection">
            <h1 onClick={() => errorDetect()}>ErrorDetection</h1>
            <hr/>
            {
                error ? "error" : "not error"
            }
        </div>
    )
}

export default ErrorDetection