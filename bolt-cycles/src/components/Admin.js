import { Link, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import UpdateProduct from "./UpdateProduct";
import { useState } from "react";

function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mytoggle text-white size-12 flex justify-end cursor-pointer lg:hidden">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </header>

      <div className="flex h-full">
        {/* Sidebar */}
        <div className={`fixed lg:relative top-0 left-0 w-[80%] lg:w-[20%] h-full bg-gray-500 p-4 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <nav className="flex flex-col gap-4">
            <Link
              to="/admin"
              className="text-white hover:bg-blue-600 p-2 rounded transition-all"
            >
              Product List
            </Link>
            <Link
              to="/admin/orders"
              className="text-white hover:bg-blue-600 p-2 rounded transition-all"
            >
              Order List
            </Link>
            <Link
              to="/admin/update-product"
              className="text-white hover:bg-blue-600 p-2 rounded transition-all"
            >
              Update Product
            </Link>
            <Link
              to="/home"
              className="text-white hover:bg-blue-600 p-2 rounded transition-all"
            >
              Home
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[80%] h-full bg-gray-100 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="update-product" element={<UpdateProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;