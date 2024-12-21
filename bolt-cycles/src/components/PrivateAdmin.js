import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"

function PrivateAdmin(props){
let loggedInData=useContext(UserContext)
const { Component, ...rest } = props;

    return (
        <>
        {
            loggedInData.loggedUser !== null && loggedInData.loggedUser.role ==="admin" ? <Component {...rest}></Component> : <Navigate to="/"></Navigate>
        }
        </>
    )
}

export default PrivateAdmin;