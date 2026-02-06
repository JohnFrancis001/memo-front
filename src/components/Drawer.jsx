import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/Username";

const Drawer = ({ openDrawer, drawerOpen }) => {

  const { name } = useUser();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);

    if (window.innerWidth < 1080 && drawerOpen) {
      openDrawer();
    }
  };

  return (
    <div className="absolute h-full w-full lg:w-64 lg:relative">
      
      <aside
        className={`
        h-full w-[85%] sm:w-[70%] lg:w-full
        bg-white
        border-r
        shadow-xl
        transition-transform duration-300 ease-in-out
        flex flex-col
        ${drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close Button (Mobile) */}
        <MdClose
          onClick={openDrawer}
          size={26}
          className="
          absolute right-4 top-4
          text-[#0d47a1]
          cursor-pointer
          lg:hidden"
        />

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <h1 className="lg:hidden text-sm text-gray-500">
            {name}
          </h1>

          <h2 className="text-xl font-semibold text-[#0d47a1]">
            Dashboard
          </h2>
        </div>

        {/* MENU (takes available height) */}
        <ul className="flex flex-col mt-4 flex-grow">

          <li
            onClick={() => handleNavClick("/main")}
            className="
            px-6 py-3
            cursor-pointer
            text-gray-700
            hover:bg-blue-50
            hover:text-[#0d47a1]
            transition
            font-medium"
          >
            My Notes
          </li>

          <li
            onClick={() => handleNavClick("/all")}
            className="
            px-6 py-3
            cursor-pointer
            text-gray-700
            hover:bg-blue-50
            hover:text-[#0d47a1]
            transition
            font-medium"
          >
            All Notes
          </li>

          <li
            onClick={() => handleNavClick("/user")}
            className="
            px-6 py-3
            cursor-pointer
            text-gray-700
            hover:bg-blue-50
            hover:text-[#0d47a1]
            transition
            font-medium"
          >
            User Info
          </li>

        </ul>

        {/* FOOTER AREA (fills empty space beautifully) */}
        <div className="border-t px-6 py-4">

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-700">
              JOHN FRANCIS
            </p>

            <p className="text-xs text-gray-500">
              Memo System • v1.0
            </p>
          </div>

        </div>

      </aside>
    </div>
  );
};

export default Drawer;
