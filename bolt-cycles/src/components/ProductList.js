import { useState, useEffect } from "react";

function ProductList() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bolt-cycles.onrender.com/cycle")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []); 

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {
        loading ? (
          <p>Loading...</p>
        ) :
      products.map((product) => {
        return (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.imageurl}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-lg text-green-600 font-bold">${product.price}</p>
              <p className="text-gray-600 text-sm">{product.category}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
