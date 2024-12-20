import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function Login() {

let navigate =useNavigate();

let loggedInData = useContext(UserContext)

 let [user,setUser]=useState({
    email:"",
    password:""
 })  


 let [message,setMessage]=useState({
    type:"",
    text:""
 })

    function handleInput(e){
        setUser((prevObj)=>{
            return {...prevObj,[e.target.name]:e.target.value}
          })
    }



    function handleSubmit(e){
        e.preventDefault();
        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(user),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((response)=>
        {
            if(response.status === 404){
                setMessage({type:"error",text:"email doesn't exist"})
    
            }
            else if(response.status === 403){
                setMessage({type:"error",text:"password wrong"})
               
            }
            else if(response.status === 200){
                return response.json()
            }  
        })
        .then((data)=>{
            // console.log(data)
           
            if(data.token !== undefined){
            localStorage.setItem("boltCycles",JSON.stringify(data))
            loggedInData.setLoggedUser(data)
            if(data.role === "admin"){
                navigate("/admin")
            }
            else
             navigate("/home")
            }
            setTimeout(()=>{
                setMessage({type:"invisible-msg"})
            },5000)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-600 via-black to-red-600 flex justify-center items-center">
            <form className="w-96 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">LOGIN</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                         name="email"
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInput}
                        value={user.email}
                       
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                         name="password"
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInput}
                        value={user.password}
                    />
                    <button className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
                        LOGIN
                    </button>
                    <p className="text-center text-gray-600">
                        DON'T HAVE AN ACCOUNT?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            REGISTER
                        </Link>
                    </p>
                    <p className={`${message.type} p-2 font-medium text-lg`}>{message.text}</p>
                </div>
            </form>
        </div>
    );
}

export default Login;
