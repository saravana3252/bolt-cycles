import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Banner(){
    return (
        <>
        <div className="w-full h-[600px] bg-black">
            <div className="relative bg-cover bg-center lg:bg-fixed w-full h-full bg-[url('https://websitedemos.net/cycle-shop-02/wp-content/uploads/sites/789/2021/04/moutain-bike.jpg')]">
            <div className="absolute top-0 z-10 bg-gradient-to-t from-black/70 to-black/10 w-full h-full"></div>
            <div className="absolute top-5 px-5 z-20 w-[100%] flex flex-col lg:top-28 lg:w-1/2 lg:left-10 lg:px-0">
            <p className="text-2xl font-bold text-white">Discover The Collection</p>
            <p className="text-6xl font-bold text-white mt-5 italic">Mountain Bikes</p>
            <p className="text-xl mt-5 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.</p>
            <div className="flex mt-5 text-white">
            <div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Officia deserunt mollit</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Excepteur sint occaecat</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Sunt in culpa qui</div>
            </div>
            <div className="pl-5">
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2" /> Officia deserunt mollit</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Excepteur sint occaecat</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Sunt in culpa qui</div>
            </div>
            </div>
           <button className="p-4 bg-red-500 w-[50%] lg:w-3/12 mt-10 font-bold text-white"><Link to="/bicycles" >EXPLORE NOW</Link></button>
            </div>
            </div>
        </div>
        <div className="w-full h-[600px] bg-black">
            <div className="relative bg-cover bg-center  lg:bg-fixed w-full h-full bg-[url('https://websitedemos.net/cycle-shop-02/wp-content/uploads/sites/789/2021/04/city-bike.jpg')]">
            <div className="absolute top-0 z-10 bg-gradient-to-t from-black/70 to-black/10 w-full h-full"></div>
            <div className="absolute top-5 px-5 z-20 w-[100%] flex flex-col lg:top-28 lg:w-1/2 lg:left-10 lg:px-0">
            <p className="text-2xl font-bold text-white">Discover The Collection</p>
            <p className="text-6xl font-bold text-white mt-5 italic">City Bikes</p>
            <p className="text-xl mt-5 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.</p>
            <div className="flex mt-5 text-white">
            <div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Officia deserunt mollit</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Excepteur sint occaecat</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Sunt in culpa qui</div>
            </div>
            <div className="pl-5">
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2" /> Officia deserunt mollit</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Excepteur sint occaecat</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Sunt in culpa qui</div>
            </div>
            </div>
           <button className="p-4 bg-red-500 w-[50%] lg:w-3/12  mt-10 font-bold text-white"><Link to="/bicycles" >EXPLORE NOW</Link></button>
            </div>
            </div>
        </div>
        <div className="w-full h-[600px] bg-black">
            <div className="relative bg-cover bg-center lg:bg-fixed w-full h-full bg-[url('https://websitedemos.net/cycle-shop-02/wp-content/uploads/sites/789/2021/04/speciality-bike.jpg')]">
            <div className="absolute top-0 z-10 bg-gradient-to-t from-black/70 to-black/10 w-full h-full"></div>
            <div className="absolute top-5 px-5 z-20 w-[100%] flex flex-col lg:top-28 lg:w-1/2 lg:left-10 lg:px-0">
            <p className="text-2xl font-bold text-white">Discover The Collection</p>
            <p className="text-6xl font-bold text-white mt-5 italic">Speciality Bikes</p>
            <p className="text-xl mt-5 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.</p>
            <div className="flex mt-5 text-white">
            <div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Officia deserunt mollit</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Excepteur sint occaecat</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Sunt in culpa qui</div>
            </div>
            <div className="pl-5">
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2" /> Officia deserunt mollit</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Excepteur sint occaecat</div>
                <div><FontAwesomeIcon icon={faBullseye} className="text-red-600 pr-2"/> Sunt in culpa qui</div>
            </div>
            </div>
           <button className="p-4 bg-red-500 w-[50%] lg:w-3/12  mt-10 font-bold text-white"><Link to="/bicycles" >EXPLORE NOW</Link></button>
            </div>
            </div>
        </div>

       
        </>
    )
}

export default Banner;