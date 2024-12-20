function UpdateProduct() {
    return (
      <>
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Products</h1>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Product ID</label>
              <input
                type="number"
                placeholder="Enter ID"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <input
                type="text"
                placeholder="Enter category"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <input
                type="text"
                placeholder="Enter description"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Image URL</label>
              <input
                type="url"
                placeholder="Upload image"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Stock</label>
              <input
                type="number"
                placeholder="Enter stock"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Rating</label>
              <input
                type="number"
                placeholder="Enter rating"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Arrival</label>
              <input
                type="text"
                placeholder="Enter arrival"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Reviews</label>
              <input
                type="text"
                placeholder="Enter reviews"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              UPDATE
            </button>
          </div>
        </div>
  
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Delete Product</h1>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Product Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
              DELETE
            </button>
          </div>
        </div>
      </>
    );
  }
  
  export default UpdateProduct;
  