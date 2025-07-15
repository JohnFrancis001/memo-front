import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Reg = () => {
  const nav = useNavigate();

  const [regInfo, setRegInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const reg = async (e) => {
    e.preventDefault();
    try {
      const newUser = await axios.post(
        "http://localhost:5000/log/new",
        regInfo
      );
      if (newUser.status === 200) {
        alert("User Created!");
        nav("/log");
      } else {
        alert("Some Error");
      }
    } catch (e) {
      console.error(e);
      alert("User Registration failed!");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-200 flex items-center justify-center px-4">
      <form
        onSubmit={reg}
        className="bg-white w-full md:max-w-lg p-6 rounded-lg shadow-lg flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            onChange={(e) => {
              setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
            }}
            className="outline-none border-2 rounded px-3 py-2"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={(e) => {
              setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
            }}
            className="outline-none border-2 rounded px-3 py-2"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            onChange={(e) => {
              setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
            }}
            className="outline-none border-2 rounded px-3 py-2"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 transition">
          Register
        </button>

        <Link to={"/log"} className="text-center">
          Already Have An Account, <b>Sign In!</b>
        </Link>
      </form>
    </div>
  );
};

export default Reg;
