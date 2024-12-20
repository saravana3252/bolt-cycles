import Accessories from "./components/Accessories";
import Bicycles from "./components/bicycles";
import Home from "./components/Home";
import Cart from "./components/Cart";
import  Checkout from "./components/Checkout";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { UserContext } from "./contexts/UserContext";
import Private from "./components/Private";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";
import Admin from "./components/Admin";

function App() {
  let [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  let [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("boltCycles"))
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function AddToCart(item) {
    setCart((prevCart) => [...prevCart, item]);
    toast.success(`${item.name} has been added to your cart!`, {
      position: "bottom-left",
      autoClose: 3000,
    });
  }

  function RemoveFromCart(index) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
    toast.info("Product has been removed from your cart!", {
      position: "bottom-left",
      autoClose: 3000,
    });
  }

  console.log(cart);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Routes>
        <Route path="/" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route
            path="/home"
            element={
              <Private
                Component={Home}
                AddToCart={AddToCart}
                cartLength={cart.length}
              ></Private>
            }
          />
          <Route
            path="/bicycles"
            element={
              <Private
                Component={Bicycles}
                AddToCart={AddToCart}
                cartLength={cart.length}
              ></Private>
            }
          />
          <Route
            path="/accessories"
            element={
              <Private
                Component={Accessories}
                AddToCart={AddToCart}
                cartLength={cart.length}
              ></Private>
            }
          />
          <Route
            path="/cart"
            element={
              <Private
                Component={Cart}
                cartData={cart}
                AddToCart={AddToCart}
                cartLength={cart.length}
                RemoveFromCart={RemoveFromCart}
              ></Private>
            }
          />
          <Route
            path="/checkout"
            element={<Private Component={Checkout} cartData={cart} />}
          />
            <Route
            path="/contact"
            element={<Private Component={Contact} cartLength={cart.length}/>}
          />
          <Route
            path="/aboutus"
            element={<Private Component={AboutUs} cartLength={cart.length}/>}
          />
            <Route
            path="/success"
            element={<Private Component={PaymentSuccess}/>}
          />
           <Route
            path="/cancel"
            element={<Private Component={PaymentCancel}/>}
          />
           <Route
            path="/admin/*"
            element={<Private Component={Admin}/>}
          />
        </Routes>
        
      </UserContext.Provider>
    </>
  );
}

export default App;
