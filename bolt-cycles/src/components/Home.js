import { useState,useEffect } from "react"
import Header from './Header';
import NewArrivals from "./NewArrivals";
import Banner from "./banner";
import Whykryo from "./Whykryo";
import AccessoriesHome from "./AccessoriesHome";
import Banner2 from "./Banner2";
import Footer from "./Footer";

function Home(props) {

let [data,setData] = useState([]);


  useEffect(()=>{
     fetch("http://localhost:8000/cycle").then((response)=>response.json()).then((data)=>{
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
