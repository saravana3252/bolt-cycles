import { useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function NewArrivals(props) {
    let newarrival = props.data.filter((data) => data.isNewArrival);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="w-full">
            <h1 className="text-center italic font-bold text-5xl py-3 lg:py-10">NEW ARRIVALS</h1>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {newarrival.map((data, index) => {
                    return (
                        <div
                            key={index}
                            className="h-full w-full px-5 text-start py-4 lg:py-5"
                        >
                            <div
                                className="relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <img className="w-full" src={data.imageurl} alt="cycleimg" />
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
                            <p className="font-thin">{data.category}</p>
                            <p className="font-bold mt-1">{data.name}</p>
                            <p>rating: {data.rating}</p>
                            <p>${data.price}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default NewArrivals;
