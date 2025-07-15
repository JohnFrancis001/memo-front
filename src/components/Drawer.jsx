import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/Username";

// The Drawer Component with toggling effect for small screen sizes and static ( no toggle effect ) for large ones.
const Drawer = ({ openDrawer, drawerOpen }) => {
  // name is used from context api to get the current user's name to show only on small devices for better UI experience. 
  const { name } = useUser();

  const navigate = useNavigate();

  //This function is responsible for handling the different navigation paths when clicked on the drawer options and set the toggle state back to false to slide back
  const handleNavClick = (path) => {
    navigate(path);
    // set the state true if drawer default state set to false due re-render specifically of small screen sizes
    if (window.innerWidth < 1080 && !drawerOpen) {
      openDrawer(); // Always call on small size
    }
  };

  return (
    <div className="absolute h-full w-full lg:h-full lg:w-64 lg:relative ">
      <aside className="bg-gradient-to-t from-teal-200 via-teal-700 to-blue-900 h-full w-[95%] box-border overflow-hidden relative lg:h-full lg:w-full">
        <MdClose
          color="red"
          onClick={openDrawer}
          size={40}
          className="absolute right-5 top-5 addIcon cursor-pointer lg:hidden"
        />

        <div className="flex items-start justify-around flex-col h-20 ml-5 lg:items-center">
          <h1 className="lg:hidden text-white mt-2">{name}</h1>
          <h2 className="text-4xl lg:mt-12 text-white">Menu</h2>
        </div>

        <ul className="h-full flex flex-col items-start mt-32 text-xl w-full">
          <li
            onClick={() => handleNavClick("/main")}
            className="menu_list h-20 flex_row_center"
          >
            My_Notes
          </li>
          <li
            onClick={() => handleNavClick("/all")}
            className="menu_list h-20 flex_row_center"
          >
            All_Notes
          </li>
          <li
            onClick={() => handleNavClick("/user")}
            className="menu_list h-20 flex_row_center"
          >
            User_Info
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Drawer;
