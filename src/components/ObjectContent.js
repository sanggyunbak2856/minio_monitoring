import React from "react"
import "../App.css"

const ObjectContent = ({contents}) => {

    return (
        <div className="ObjectContent">
            {contents?.toString()}
        </div>
    )
}

export default ObjectContent