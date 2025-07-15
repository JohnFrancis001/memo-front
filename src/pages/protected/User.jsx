import { useState } from "react";
import Drawer from "../../components/Drawer";
import { useUI } from "../../contexts/CompTransits";
import { useUser } from "../../contexts/Username";
import Header from "../../components/Header";
import ViewNote from "../../components/ViewNote";
import axios from "axios";
import { toast } from "react-hot-toast";


const User = () => {
  const { drawerOpen, openDrawer, viewOpen, viewSlide } = useUI();
  const { getUser, name } = useUser();
  const [userData, setUserData] = useState({});

  const updateUser = async (e) => {
    e.preventDefault();
    console.log(name);
    try {
      const update_res = await axios.put(
        "http://localhost:5000/user/update",
        userData,
        { withCredentials: true }
      );
      if (update_res.status === 200) {
        toast.success("User updated!");
        await getUser();
      } else {
        toast.error("Failed to update user.");
      }
    } catch (e) {
      console.log("User not updated");
    }
  };

  return (
    <div className="relative overflow-hidden layout-grid">
      <div
        className={`grid-drawer 
  ${drawerOpen ? "translate-x-0" : "-translate-x-full"} 
  transition-transform duration-300 ease-in-out
  lg:translate-x-0
  ${drawerOpen ? "fixed top-0 left-0 z-10 h-full w-full" : "relative"}
`}
      >
        <Drawer openDrawer={openDrawer} />
      </div>

      <div className="grid-header">
        <Header openDrawer={openDrawer} />
      </div>

      <ViewNote
        viewSlide={viewSlide}
        viewOpen={viewOpen}
        className={`
    ${viewOpen ? "translate-x-0" : "-translate-x-full"} 
    transition-transform duration-300 ease-in-out
    lg:translate-x-0
    ${viewOpen ? "fixed top-0 left-0 z-29 h-full w-full" : "relative"}
  `}
      />

      <main className="px-4  m-20">
        <form
          onSubmit={updateUser}
          className="bg-white h-full w-full p-6 rounded-lg shadow-lg flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
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
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
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
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
              className="outline-none border-2 rounded px-3 py-2"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 transition">
            update
          </button>
        </form>
      </main>
    </div>
  );
};

export default User;
