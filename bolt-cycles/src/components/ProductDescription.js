import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";



function ProductDescription(props) {
    return (
      <>
             <div className="bg-red-500 w-full h-16 p-2 flex justify-between items-center px-8 lg:h-16">
        {/* Logo Section */}
        <div className="w-[35%] h-12 flex justify-start ">
          <img src={Logo} className="h-full" alt="logo" />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          onClick={() => {
            document.getElementById("mobileNav").style.right = 0;
          }}
          className="mytoggle text-white size-12 flex justify-end cursor-pointer lg:hidden"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div
          id="desktopNav"
          className="w-full h-full justify-between items-center px-8 hidden lg:flex"
        >
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

        <div
          id="mobileNav"
          className="fixed top-0 z-50 -right-[50%]  bg-blue-700 w-1/2 h-[100%] flex flex-col items-center justify-evenly transition-all duration-500 ease-in-out lg:hidden"
        >
          <div className="text-2xl text-white border border-white p-2 px-4">
            <button
              onClick={() => {
                document.getElementById("mobileNav").style.right = "-50%";
              }}
            >
              X
            </button>
          </div>
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


      <div className="container mx-auto p-6 lg:p-12 bg-gray-100 rounded-lg shadow-lg">
  {/* Product Section */}
  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 bg-white p-6 rounded-lg shadow-lg">
    {/* Image Section */}
    <div className="lg:w-1/3 w-full flex justify-center">
      <img
        src={props.product.imageurl}
        alt={props.product.name}
        className="w-2/3 lg:w-full max-h-80 object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Product Details */}
    <div className="lg:w-2/3 w-full flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-gray-800">{props.product.name}</h1>
      <p className="text-2xl font-semibold text-green-600">${props.product.price} & Free Shipping</p>
      <p className="mt-2 text-gray-600">{props.product.description}</p>
      <p className="text-gray-500 italic">{props.product.category}</p>

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => props.AddToCart(props.product)}
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* Reviews Section */}
  <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Reviews</h2>
    {props.product.reviews.length > 0 ? (
      <ul className="space-y-6">
        {props.product.reviews.map((review, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg bg-gray-50 shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            <p className="text-gray-700">{review}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 italic">No reviews available.</p>
    )}
  </div>
</div>

      </>
    );
  }
  
  export default ProductDescription;
  