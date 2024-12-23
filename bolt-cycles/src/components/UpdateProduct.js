import {useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function UpdateProduct() {

const [inpDeleteValue,setInpDeleteValue]=useState("")

const [data,setData]=useState(
  {
    id:0,
    name:"",
    price:0,
    category:"",
    description:"",
    imageurl:"",
    stock:0,
    rating:0,
    arrival:"",
    reviews:[]
  }
) 

useEffect(()=>{
  console.log(data)
},[data])

function handleUpdate(e){
  if(e.target.name === "reviews"){
    setData((prevObj)=>{
      return {...prevObj,reviews:e.target.value.split("\n")}
    })
  }
  else{
  setData((prevObj)=>{
    return {...prevObj,[e.target.name]:e.target.value}
  })
}
}

function handleSubmit(e){
  e.preventDefault();
  fetch("https://bolt-cycles.onrender.com/updateproducts",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "Content-Type":"application/json"
    }
  }).then((response)=>response.json()).then((data)=>{
    console.log(data)
    console.log("Product Updated")
    toast.success("Product Updated",{
      position:"bottom-left",
      autoClose:3000
    })
    setData( {
      productId:0,
      name:"",
      price:0,
      category:"",
      description:"",
      imageurl:"",
      stock:0,
      rating:0,
      arrival:"",
      reviews:[]
    })
  }).catch((err)=>{
    console.log(err)
  })
}

function handleDelete(){
fetch(`https://bolt-cycles.onrender.com/deleteproducts/${inpDeleteValue}`,{
  method:"DELETE",
}).then((response)=>response.json()).then((data)=>{
  console.log(data)
  console.log("Product Deleted")
  toast.info("product deleted",{
    position:"bottom-left",
    autoClose:3000
  })
  setInpDeleteValue("")
}).catch((err)=>{
  console.log(err)
})
}

function handleinpDelete(e){
  setInpDeleteValue(e.target.value)
}

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
    
    <div className="p-6 bg-gray-100 min-h-screen">
      <form className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Products</h1>
        <div className="grid grid-cols-1 gap-6 ">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product ID</label>
            <input
              type="number"
              placeholder="Enter ID"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="productId"
              value={data.productId}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="name"
              value={data.name}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="price"
              value={data.price}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="category"
              value={data.category}
              onChange={handleUpdate}
           />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter description"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              name="description"
              value={data.description}
              onChange={handleUpdate}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              type="text"
              placeholder="Upload image"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="imageurl"
              value={data.image}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock</label>
            <input
              type="number"
              placeholder="Enter stock"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="stock"
              value={data.stock}
              onChange={handleUpdate}
           />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rating</label>
            <input
              type="number"
              placeholder="Enter rating"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="rating"
              value={data.rating}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Arrival</label>
            <input
              type="text"
              placeholder="Enter arrival"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="arrival"
              value={data.arrival}
              onChange={handleUpdate}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Reviews</label>
            <textarea
              placeholder="Enter reviews"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              name="reviews"
              value={data.reviews.join('\n')}
              onChange={handleUpdate}
            ></textarea>
          </div>
          <button className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            UPDATE
          </button>
        </div>
      </form>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8 mb-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Delete Product</h1>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              name="inpDelete"
              onChange={handleinpDelete}
            />
          </div>
          <button className="w-full bg-red-500 text-white py-3 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
    </>
  );
}


export default UpdateProduct;