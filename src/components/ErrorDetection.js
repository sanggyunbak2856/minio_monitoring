import React, {useState, useEffect} from "react"
import '../App.css'

const ErrorDetection = ({contents}) => {
    const [error, setError] = useState(false)
    const [lowBound, setLowBound] = useState(0)
    const [upperBound, setUpperBound] = useState(100)

    let FLAG = false // error 초기화 위해

    const errorDetect = () => {
        console.log("contents : ", contents)
        contents?.forEach(m => {
            console.log("m : ", m)
            const contentArr = JSON.parse(m).message.split(" ")
            contentArr[0] == " " && contentArr.shift()
            console.log("content arr", contentArr)
            contentArr.forEach(e => {
                const i = Number(e)
                if(i < lowBound || i > upperBound) {
                    console.log("here")
                    setError(true)
                    FLAG = true
                    return
                }
            })
            if(FLAG == true) {
                return
            }
        });
        if(FLAG == false) {
            setError(false)
            return
        }
    }

    useEffect(()=>{
        console.log("error", error)
    }, [error])

    const onChangeLowBound = (e) => {
        setLowBound(Number(e.target.value))
    }

    const onChangeUpperBound = (e) => {
        setUpperBound(Number(e.target.value))
    }

    useEffect(()=>{
        console.log(lowBound, typeof lowBound)
        console.log(upperBound, typeof upperBound)
    }, [lowBound, upperBound])

    return (
        <div className="ErrorDetection">
            <h1>ErrorDetection</h1>
            <button   onClick={() => errorDetect()}>Detect</button>
            <hr/>
            Low : <input 
                    onChange={e => onChangeLowBound(e)} 
                    type="number" 
                    value={lowBound}
                    />
                <br/>
            Upper : <input 
                        onChange={e => onChangeUpperBound(e)} 
                        type="number" 
                        value={upperBound}
                        />
            <hr/>
            {
                error ? "error" : "not error"
            }
        </div>
    )
}

export default ErrorDetection