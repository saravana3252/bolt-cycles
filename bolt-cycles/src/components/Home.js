import { useState,useEffect, useContext } from "react"
import Header from './Header';
import NewArrivals from "./NewArrivals";
import Banner from "./banner";
import Whykryo from "./Whykryo";
import AccessoriesHome from "./AccessoriesHome";
import Banner2 from "./Banner2";
import Footer from "./Footer";
import React from "react";
import { UserContext } from "../contexts/UserContext";


function Home(props) {

let [data,setData] = useState([]);

 const  loggedIndata  = useContext(UserContext);
 
  useEffect(()=>{
     fetch("https://bolt-cycles.onrender.com/products",{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${loggedIndata.loggedUser.token}`
      }
     }).then((response)=>response.json()).then((data)=>{
      setData(data)
     }).catch((err)=>{
      console.log(err)
     })
  },[])




  return (
    <div>
    <Header cartLength={props.cartLength}></Header>
    <NewArrivals data={data} AddToCart={props.AddToCart}></NewArrivals>
    <Banner></Banner>
    <Whykryo></Whykryo>
    <AccessoriesHome AddToCart={props.AddToCart}></AccessoriesHome>
    <Banner2></Banner2>
    <Footer></Footer>
    </div>
  );
}

export default Home;
