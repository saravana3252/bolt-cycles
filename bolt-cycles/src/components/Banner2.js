import { Link } from "react-router-dom";

function Banner2(){
    return (
        <>
        <div className="w-full h-[550px] relative flex justify-center items-center lg:bg-fixed bg-cover bg-center bg-[url('https://websitedemos.net/cycle-shop-02/wp-content/uploads/sites/789/2021/03/bike-hero.jpg')]">
        <div className="absolute top-0 w-full h-full z-10 bg-gradient-to-t from-black/80 to-black/20"></div>
        <div className="w-[70%] h-1/2 flex flex-col items-center justify-center gap-4 lg:gap-7 text-white z-20">
        <p className="font-bold text-2xl">The All New</p>
        <p className="font-bold text-5xl text-center">Kryo X26 MTB Is Here</p>
        <p className="text-center">Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo.</p>
        <button className="p-2 bg-red-500 font-bold"><Link to="/bicycles" >SHOP NOW</Link></button>
        </div>
        </div>

        </>
    )
}

export default Banner2;