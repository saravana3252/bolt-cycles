import Logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10">
    
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img src={Logo} alt="Bolt Cycles Logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-400">
            Copyright &copy; Bolt Cycles 2024
          </p>
        </div>

       
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="font-bold text-lg mb-3">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/home" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="/aboutus" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

   
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="font-bold text-lg mb-3">Our Collections</h2>
          <ul className="space-y-2">
            <li>
              <a href="/Bicycles" className="hover:text-gray-400">
                Bicycles
              </a>
            </li>
            <li>
              <a href="/Accessories" className="hover:text-gray-400">
                Accessories
              </a>
            </li>
          </ul>
        </div>

       
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="font-bold text-lg mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </div>
        </div>
      </div>

     
      <div className="mt-8 border-t border-gray-800 pt-4 text-center">
        <p className="text-sm text-gray-400">
          All Rights Reserved | Bolt Cycles 2024
        </p>
      </div>
    </footer>
  );
}

export default Footer;

