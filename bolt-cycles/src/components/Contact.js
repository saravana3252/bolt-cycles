import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import Footer from './Footer';
import { toast } from "react-toastify";

function Contact(props) {

const [contactDetails,setContactDetails]=useState({email:"",subject:"",message:""});  


function handleChange(e){
  setContactDetails((prevobj)=>{
    return {...prevobj,[e.target.name]:e.target.value}
  })
}


function handleSubmit(e){
  e.preventDefault();
fetch("https://bolt-cycles.onrender.com/sendmail",{
   method:"POST",
   body:JSON.stringify(contactDetails),
   headers:{
    "Content-Type":"application/json" 
   }

}).then((response)=> response.json()).then((data)=>{
  toast.success("mail sent");
  setContactDetails({email:" ",subject:" ",message:" "});
   
}).catch((error)=>{
   toast.success("mail failed to send ! try again" );

})
}
  return (
    <>
    <div className="bg-orange-600 w-full h-16 p-2 flex justify-between items-center px-8  lg:h-16">
  {/* Logo Section */}
  <div className="w-[35%] h-12 flex justify-start ">
    <img src={Logo} className="h-full" alt="logo" />
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={()=>{
    document.getElementById("mobileNav").style.right=0;
  }} className="mytoggle text-white size-12 flex justify-end cursor-pointer  lg:hidden "> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> </svg> 
  <div id="desktopNav" className="w-full h-full  justify-between items-center px-8 hidden lg:flex">
  <div className="flex space-x-8 text-white font-bold ">
    <Link to="/home" className="hover:underline hover:underline-offset-8">
      HOME
    </Link>
    <Link to="/bicycles" className="hover:underline hover:underline-offset-8">
      BICYCLES
    </Link>
    <Link to="/accessories" className="hover:underline hover:underline-offset-8">
      ACCESSORIES
    </Link>
    <Link to="/aboutus" className="hover:underline hover:underline-offset-8">
      ABOUT US
    </Link>
    <Link to="/contact" className="hover:underline hover:underline-offset-8">
      CONTACT
    </Link>
  </div>

  {/* Cart and Logout Section */}
  <div className="flex items-center space-x-6">
    {/* Logout Button */}
    <button
      className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full"
      onClick={() => {
        localStorage.removeItem("boltCycles");
        localStorage.removeItem("cart");
        window.location.href = "/login"; // Redirect to login page
      }}
    >
      LOGOUT
    </button>

    {/* Cart Icon with Cart Length */}
    <Link to="/cart" className="relative">
      <FontAwesomeIcon icon={faCartShopping} size="lg" className="text-white" />
      {props.cartLength > 0 && (
        <span className="absolute top-[-12.5px] right-[-12.5px] bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {props.cartLength}
        </span>
      )}
    </Link>
  </div>
</div>

<div id="mobileNav" className="fixed top-0 z-50 -right-[50%]  bg-gray-800 w-1/2 h-[100%] flex flex-col items-center gap-5 transition-all duration-500 ease-in-out lg:hidden">
<div className="text-2xl text-white border border-orange-500 p-2 px-4 mt-7"><button onClick={()=>{
  document.getElementById("mobileNav").style.right="-50%"
}}>X</button></div>
  <div className="flex flex-col items-center space-y-8 text-orange-500 font-bold ">
    <Link to="/home" className="hover:underline hover:underline-offset-4">
      HOME
    </Link>
    <Link to="/bicycles" className="hover:underline hover:underline-offset-4">
      BICYCLES
    </Link>
    <Link to="/accessories" className="hover:underline hover:underline-offset-4">
      ACCESSORIES
    </Link> <Link to="/aboutus" className="hover:underline hover:underline-offset-8">
      ABOUT US
    </Link>
    <Link to="/contact" className="hover:underline hover:underline-offset-8">
      CONTACT
    </Link>
  </div>

  {/* Cart and Logout Section */}
  <div className="flex flex-col items-center space-y-8">
    {/* Logout Button */}
    <button
      className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full"
      onClick={() => {
        localStorage.removeItem("boltCycles");
        localStorage.removeItem("cart");
        window.location.href = "/"; // Redirect to login page
      }}
    >
      LOGOUT
    </button>

    {/* Cart Icon with Cart Length */}
    <Link to="/cart" className="relative">
      <FontAwesomeIcon icon={faCartShopping} size="lg" className="text-white" />
      {props.cartLength > 0 && (
        <span className="absolute top-[-12.5px] right-[-12.5px] bg-orange-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {props.cartLength}
        </span>
      )}
    </Link>
  </div>
</div>
</div>

    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
        </p>
        <form action="#" className="space-y-8 " onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
              name='email'
              value={contactDetails.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
              name='subject'
              value={contactDetails.subject}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              name='message'
              value={contactDetails.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="bg-red-600  py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Send message
          </button>
        </form>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
}

export default Contact;
