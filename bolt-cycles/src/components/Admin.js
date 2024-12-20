import { Link, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import UpdateProduct from "./UpdateProduct";

function Admin() {
  return (
    <div className="admin">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[20%] h-screen bg-blue-500 p-4">
          <nav className="flex flex-col gap-4">
            <Link
              to="/admin/products"
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
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-[80%] h-screen bg-gray-100 p-6 overflow-auto">
          <Routes>
            <Route path="products" element={<ProductList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="update-product" element={<UpdateProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;

