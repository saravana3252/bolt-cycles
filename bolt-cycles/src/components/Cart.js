import { Link } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../images/logo.png";
import { useEffect } from "react";
import Footer from "./Footer";

function Cart(props) {
    // Calculate Total Price
    const totalPrice = props.cartData.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        console.log(props.cartData);
    }, [props.cartData]);

    return (
        <>
            {/* Header */}
   <div className="w-full h-16 p-2 flex justify-between items-center px-8 bg-red-500 lg:h-16">
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
       <p className="hover:underline hover:underline-offset-8">ABOUT US</p>
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
           <span className="absolute top-[-12.5px] right-[-12.5px] bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
             {props.cartLength}
           </span>
         )}
       </Link>
     </div>
   </div>
   
   <div id="mobileNav" className="fixed top-0 z-50 -right-[50%]  bg-blue-700 w-1/2 h-[100%] flex flex-col items-center justify-evenly transition-all duration-500 ease-in-out lg:hidden">
   <div className="text-2xl text-white border border-white p-2 px-4"><button onClick={()=>{
     document.getElementById("mobileNav").style.right="-50%"
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
       <p className="hover:underline hover:underline-offset-8">ABOUT US</p>
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
           <span className="absolute top-[-12.5px] right-[-12.5px] bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
             {props.cartLength}
           </span>
         )}
       </Link>
     </div>
   </div>
   </div>


            {/* Cart Section */}
            <div className="bg-slate-100 min-h-screen p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
    {/* Cart Items */}
    <div className="w-full lg:w-3/4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-6 lg:mb-8">Your Cart</h1>
        {props.cartLength > 0 ? (
            <div className="flex flex-col space-y-6">
                {props.cartData.map((data, index) => (
                    <div
                        key={index}
                        className="flex flex-col lg:flex-row items-center justify-between p-4 bg-white rounded shadow-md space-y-4 lg:space-y-0"
                    >
                        {/* Product Image */}
                        <div className="flex items-center space-x-4 w-full lg:w-auto">
                            <div className="w-24 h-24">
                                <img
                                    src={data.imageurl}
                                    alt="product"
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            <div className="flex-1 lg:flex-none">
                                <p className="text-lg font-semibold text-gray-800">{data.name}</p>
                                <p className="text-gray-600">Price: ${data.price}</p>
                            </div>
                        </div>
                        {/* Remove Button */}
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => props.RemoveFromCart(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-500 text-lg mt-10">
                Your cart is empty.
            </div>
        )}
    </div>

    {/* Total Price & Checkout */}
    {props.cartLength > 0 && (
        <div className="w-full lg:w-1/4 bg-white p-4 rounded shadow-md self-start lg:h-1/2">
            <h2 className="text-lg lg:text-xl font-bold text-gray-700 mb-4">Summary</h2>
            <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
                className="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                <Link to="/checkout">Proceed to Checkout</Link>
            </button>
        </div>
    )}
</div>
<Footer></Footer>
        </>
    );
}

export default Cart;
