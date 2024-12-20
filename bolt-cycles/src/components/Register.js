import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {

 let [user,setUser]=useState({
    name:"",
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
    fetch("https://bolt-cycles.onrender.com/register",{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((response)=>response.json()).then((res)=>{
        setMessage({type:"success",text:res.message})
        setUser({
            name:"",
            email:"",
            password:""
        })
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
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">REGISTER</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleInput}
                        value={user.name}
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleInput}
                        value={user.email}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleInput}
                        value={user.password}
                    />
                    <button className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
                        REGISTER
                    </button>
                    <p className="text-center text-gray-600">
                        ALREADY HAVE AN ACCOUNT?{" "}
                        <Link to="/" className="text-blue-500 hover:underline">
                            LOGIN
                        </Link>
                    </p>
                    <p className={`${message.type} p-2 font-medium text-lg`}>{message.text}</p>
                </div>
            </form>
        </div>
    );
}

export default Register;
