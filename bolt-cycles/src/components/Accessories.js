import { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";

function Accessories(props) {
    const [accessoriesData, setAccessoriesData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [searchData, setSearchData] = useState("");
    const [FilterData,setFilterData] = useState(null)


    useEffect(() => {
        if (searchData !== "") {
            fetch(`http://localhost:8000/Accessories/${searchData}`)
                .then((response) => response.json())
                .then((data) => {
                    setAccessoriesData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } 
        else if(FilterData){
            fetch(`http://localhost:8000/cycles/${FilterData}`).then((response)=>response.json()).then((data)=>{
                setAccessoriesData(data)
                console.log(data)
                console.log(FilterData)
            }).catch((err)=>{
                console.log(err)
            })
        }
        
        else {
            fetch("http://localhost:8000/cycle/Accessories")
                .then((response) => response.json())
                .then((data) => {
                    setAccessoriesData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [searchData,FilterData]);

    return (
        <div>
            {/* Header */}
           <div className=" w-full h-16 p-2 flex justify-between items-center px-8 bg-red-500 lg:h-16">
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
                   <span className="absolute top-[-12.5px] right-[-12.5px] bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                     {props.cartLength}
                   </span>
                 )}
               </Link>
             </div>
           </div>
           
           <div id="mobileNav" className="fixed top-0 z-50 right-0 bg-blue-700 w-1/2 h-[100%] flex flex-col items-center justify-evenly transition-all duration-500 ease-in-out lg:hidden">
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
                   <span className="absolute top-[-12.5px] right-[-12.5px] bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                     {props.cartLength}
                   </span>
                 )}
               </Link>
             </div>
           </div>
           </div>

            {/* Accessories Content */}
            <div className="flex flex-col md:flex-row mt-10 bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white p-5 space-y-6">
                    {/* Search */}
                    <div className="bg-gray-100 p-4 rounded shadow">
                        <h1 className="text-lg font-bold mb-3">Search</h1>
                        <div className="flex">
                            <input
                                id="searchInp"
                                className="flex-grow p-2 bg-gray-200 rounded-l focus:outline-none"
                                type="search"
                                placeholder="Search accessories..."
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                            <button
                                className="p-2 bg-red-500 text-white rounded-r"
                                onClick={() => {
                                    const value = document.getElementById("searchInp").value;
                                    setSearchData(value);
                                }}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>

                    {/* Filter by Price */}
                    <div className="bg-gray-100 p-4 rounded shadow">
                        <h1 className="text-lg font-bold mb-3">Filter by Price</h1>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input  type="checkbox" className="filter mr-2" value="50" onChange={(e)=>{
                                     if(e.target.checked){
                                     setFilterData(e.target.value)
                                     }
                                     else{
                                        setFilterData(null)
                                     }
                                     
                                     }}/> Less than $50
                            </label>
                            <label className="flex items-center">
                                <input  type="checkbox" className="filter mr-2" value="150" onChange={(e)=>{
                                     if(e.target.checked){
                                     setFilterData(e.target.value)
                                     }
                                     else{
                                        setFilterData(null)
                                     }
                                     
                                     }}/> Less than $150
                            </label>
                            <label className="flex items-center">
                                <input  type="checkbox" className="filter mr-2" value="190" onChange={(e)=>{
                                     if(e.target.checked){
                                     setFilterData(e.target.value)
                                     }
                                     else{
                                        setFilterData(null)
                                     }
                                     
                                     }} /> Less than $190
                            </label>
                        </div>
                    </div>

                    {/* Filter by Categories */}
                    <div className="bg-gray-100 p-4 rounded shadow">
    <h1 className="text-lg font-bold mb-3">Filter by Categories</h1>
    <div className="space-y-1">
        <Link to="/accessories" className="flex items-center justify-between  text-red-600">
            <span className="flex items-center font-semibold">
                Accessories
            </span>
            <span className="text-gray-500">10 products</span>
        </Link>
        <Link to="/bicycles" className="flex items-center justify-between  text-red-600">
            <span className="flex items-center font-semibold">
                Bicycles
            </span>
            <span className="text-gray-500">4 products</span>
        </Link>
    </div>
</div>
                </div>

                {/* Product Grid */}
                <div className="w-full md:w-3/4 bg-gray-100 p-6">
                    <h1 className="font-bold italic text-4xl text-red-500 mb-8">ACCESSORIES</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {accessoriesData.length > 0 ? (
                            accessoriesData.map((data, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded shadow p-4 relative transform hover:scale-105 transition-transform"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src={data.imageurl}
                                            alt="accessory"
                                            className="w-full h-48 object-cover rounded"
                                        />
                                        <div
                                            className={`absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-black text-white rounded-full ${
                                                hoveredIndex === index ? "opacity-100" : "opacity-0"
                                            } transition-opacity duration-300 cursor-pointer`}
                                            onClick={() => props.AddToCart(data)}
                                        >
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </div>
                                    </div>
                                    {/* Details */}
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">{data.category}</p>
                                        <h2 className="text-lg font-bold text-gray-800">{data.name}</h2>
                                        <p className="text-sm text-gray-600">Rating: {data.rating}</p>
                                        <p className="text-lg font-bold text-red-500">${data.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Not found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accessories;
