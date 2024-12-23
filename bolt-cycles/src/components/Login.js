import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function Login() {
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let loggedInData = useContext(UserContext);

  let [user, setUser] = useState({
    email: "",
    password: ""
  });

  let [message, setMessage] = useState({
    type: "",
    text: ""
  });

  function handleInput(e) {
    setUser((prevObj) => {
      return { ...prevObj, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://bolt-cycles.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.status === 404) {
          setMessage({ type: "error", text: "Email doesn't exist" });
          setIsLoading(false);
        } else if (response.status === 403) {
          setMessage({ type: "error", text: "Incorrect password" });
          setIsLoading(false);
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.token !== undefined) {
          localStorage.setItem("boltCycles", JSON.stringify(data));
          loggedInData.setLoggedUser(data);
          if (data.role === "admin") {
            navigate("/admin");
            setIsLoading(false);
          } else {
            navigate("/home");
            setIsLoading(false);
          }
        }
        setTimeout(() => {
          setMessage({ type: "invisible-msg" });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-600 via-black to-red-600 flex justify-center items-center p-4 md:p-8 lg:p-12">
      <form className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h1>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            value={user.email}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            value={user.password}
          />
          <button className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
            {isLoading ? "LOADING..." : "LOGIN"}
          </button>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
          <p className={`${message.type} p-2 font-medium text-lg text-center`}>{message.text}</p>
        </div>
      </form>
    </div>
  );
}

export default Login;