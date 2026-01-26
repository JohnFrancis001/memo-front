import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Reg = () => {
  const nav = useNavigate();

  const { login } = useAuth();

  const [logInfo, setLogInfo] = useState({
    name: "",
    password: "",
  });

  const log = async (e) => {
    e.preventDefault();
    try {
      const logUser = await axios.post(
        `${import.meta.env.VITE_API_URL}/log/auth`,
        logInfo,
        {
          withCredentials: true,
        }
      );
      if (logUser.status === 200) {
        alert("Success!");
        login();
        nav("/main");
      } else {
        alert("Some Error!");
      }
    } catch (e) {
      console.error(e);
      alert("Match Failed!");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-200 flex items-center justify-center px-4">
      <form
        onSubmit={log}
        className="bg-white w-full md:max-w-md p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            onChange={(e) => {
              setLogInfo({ ...logInfo, [e.target.name]: e.target.value });
            }}
            className="outline-none border-2 rounded px-3 py-2"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
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
              setLogInfo({ ...logInfo, [e.target.name]: e.target.value });
            }}
            className="outline-none border-2 rounded px-3 py-2"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 transition">
          Sign In
        </button>

        <Link to={"/"} className="text-center">
          Don't Have An Account, <b>Register!</b>
        </Link>
      </form>
    </div>
  );
};

export default Reg;
