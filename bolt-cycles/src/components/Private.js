import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"

function Private(props){
let loggedInData=useContext(UserContext)
const { Component, ...rest } = props;

    return (
        <>
        {
            loggedInData.loggedUser !== null ? <Component {...rest}></Component> : <Navigate to="/"></Navigate>
        }
        </>
    )
}

export default Private;