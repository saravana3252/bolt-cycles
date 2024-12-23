import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { UserContext } from "../contexts/UserContext";

function AccessoriesHome(props) {
    const [accData, setAccData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

const  loggedIndata  = useContext(UserContext);
    
    useEffect(() => {
        fetch("https://bolt-cycles.onrender.com/products/Accessories",{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              "authorization":`Bearer ${loggedIndata.loggedUser.token}`
            }
          })
            .then((response) => response.json())
            .then((data) => {
                setAccData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loggedIndata.loggedUser.token]);    

    return (
        <>
            <div className="w-full p-5 mb-4">
                <h1 className="text-center text-5xl font-bold">Accessories</h1>
                <div className="flex overflow-x-auto scrollbar-hide space-x-4 mt-8">
                    {accData.map((data, index) => (
                        <div
                            key={index}
                            className="w-[300px] flex-shrink-0 relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img src={data.imageurl} alt="accessoriesimg" />
                            <p className="text-start font-thin">{data.category}</p>
                            <p className="font-bold text-2xl italic">{data.name}</p>
                            <p className="text-xl">{data.rating}</p>
                            <p className="text-xl">${data.price}</p>

                            {/* Hover Effect for Add to Cart */}
                            <div
                                className={`absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-black text-white rounded-full ${
                                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                                } transition-opacity duration-300 cursor-pointer`}
                                onClick={() => {
                                    props.AddToCart(data);
                                }}
                            >
                                <FontAwesomeIcon icon={faCartShopping} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AccessoriesHome;
