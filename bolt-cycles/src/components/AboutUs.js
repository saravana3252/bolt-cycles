import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import Footer from './Footer';

function AboutUs(props) {
  return (
    <>
    <div className="bg-blue-950 w-full h-16 p-2 flex justify-between items-center px-8  lg:h-16">
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
        window.location.href = "/"; // Redirect to login page
      }}
    >
      LOGOUT
    </button>

    {/* Cart Icon with Cart Length */}
    <Link to="/cart" className="relative">
      <FontAwesomeIcon icon={faCartShopping} size="lg" className="text-white" />
      {props.cartLength > 0 && (
        <span className="absolute top-[-12.5px] right-[-12.5px] bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
    </Link>
    <Link to="/aboutus" className="hover:underline hover:underline-offset-8">
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
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
        {/* Title Section */}
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          About Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Our passion is to craft the finest bikes that blend style, function, and sustainability.
        </p>

        {/* Two-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Story Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Founded in 2010, we started with a vision to redefine the cycling experience. With a small team of dedicated artisans, we combined modern technology with traditional craftsmanship to create bikes that stand out in both form and function.
            </p>
            <img
              src="https://www.shutterstock.com/image-photo/athlete-man-cycling-blue-jersey-600nw-2482353413.jpg"
              alt="Our Journey"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Mission Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              We aim to inspire a cycling lifestyle by designing bikes that cater to a diverse community of riders. From urban commuters to mountain adventurers, our range ensures everyone finds their perfect match.
            </p>
            <img
              src="https://eu-assets.simpleview-europe.com/visitrichmond/imageresizer/?image=%2Fdmsimgs%2FUntitled_design_1053353803.jpg&action=ProductDetailImage"
              alt="Mission"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sustainability</h4>
              <p className="text-gray-500 dark:text-gray-400">
                Our bikes are built using eco-friendly materials and practices, ensuring a sustainable future.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Innovation</h4>
              <p className="text-gray-500 dark:text-gray-400">
                We continuously innovate, integrating the latest technologies to enhance your cycling experience.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Community</h4>
              <p className="text-gray-500 dark:text-gray-400">
                Join a vibrant community of bike lovers and share your passion for cycling.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            What Our Customers Say
          </h3>
          <div className="space-y-8">
            <blockquote className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">
                "This is the best bike I've ever owned! The quality and attention to detail are unmatched."
              </p>
              <cite className="block mt-4 text-right text-gray-600 dark:text-gray-400">
                - Jane Doe
              </cite>
            </blockquote>
            <blockquote className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-gray-300">
                "Incredible bikes with great customer service. Highly recommend to all cycling enthusiasts."
              </p>
              <cite className="block mt-4 text-right text-gray-600 dark:text-gray-400">
                - John Smith
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
}

export default AboutUs;
