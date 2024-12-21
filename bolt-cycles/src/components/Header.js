import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header(props) {
  return (
    <>
      <div className="w-full h-screen relative">
      <div className="absolute top-0 w-full h-16 p-2  flex justify-between items-center px-8 bg-transparent z-50 lg:h-16">
  {/* Logo Section */}
  <div className="w-[35%] h-12 flex justify-start">
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

<div id="mobileNav" className="fixed top-0 z-50 -right-[280px] bg-blue-700 w-1/2 h-[100%] flex flex-col items-center justify-evenly transition-all duration-500 ease-in-out lg:hidden">
<div className="text-2xl text-white border border-white p-2 px-4"><button onClick={()=>{
  document.getElementById("mobileNav").style.right="-280px"
}}>X</button></div>
  <div className="flex flex-col items-center space-y-8 text-white font-bold ">
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
        <span className="absolute top-[-12.5px] right-[-12.5px] bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {props.cartLength}
        </span>
      )}
    </Link>
  </div>
</div>
</div>

        
        <div className="relative w-full h-[100%] flex items-end bg-cover bg-center bg-[url('https://websitedemos.net/cycle-shop-02/wp-content/uploads/sites/789/2021/03/bike-hero.jpg')]">
         <div className="w-full h-full absolute top-0 bg-black bg-opacity-40 z-10"></div>
        
        </div>
        <div className="absolute top-24 lg:top-20 z-20 w-[80%] h-[90%] flex flex-col text-white italic p-5 lg:w-[40%] font-bold">
            <p className="font-bold text-2xl lg:text-3xl">Newly Launched</p>
            <p className="font-bold text-6xl mt-5 lg:text-8xl">Kryo X26</p>
            <p className="font-bold text-6xl mt-5 lg:text-8xl">MTB</p>
            <p className="font-bold text-xl mt-10 mb-2 lg:text-2xl">Specifications:</p>
            <ul className="list-disc pl-5">
              <li>Lightweight 18" Frame</li>
              <li>Steel Suspension Fork</li>
              <li>Steel Hardtail Frame</li>
            </ul>
            <button className="p-3 bg-red-500 font-bold w-[50%] lg:w-[40%]  mt-7 text-white">
              <Link to="/bicycles">SHOP NOW</Link>
            </button>
          </div>
      </div>
    </>
  );
}

export default Header;
