import { useState, useEffect } from "react";
import Drawer from "../../components/Drawer";
import { useUI } from "../../contexts/CompTransits";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import ViewNote from "../../components/ViewNote";
import { FaEye } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShortText from "../../components/utils/ShortText";

const AllNotes = () => {
  const {
    drawerOpen,
    openDrawer,
    viewOpen,
    viewSlide,
  } = useUI();
  const { isLoggedIn, loading, setLoading, login } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState([]);

  const nav = useNavigate();
  const verifyAuth = async (e) => {
    try {
      setLoading(true);
      const notes_res = await axios.get(`${import.meta.env.VITE_API_URL}/note/all`, {
        withCredentials: true,
      });
      if (notes_res.status === 200) {
        console.log("Notes found");
        console.log(notes_res.data.note);
        setNotes(notes_res.data.note);
        login();
      } else {
        console.log("Notes not found");
      }
    } catch (e) {
      console.log(e);
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !loading) nav("/log");
  }, [isLoggedIn, loading]);

  if (loading) {
    return <Spinner>Loading</Spinner>;
  }

  return (
    <div className="relative overflow-hidden layout-grid">
      <div
        className={`grid-drawer ${drawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 ${drawerOpen ? "fixed top-0 left-0 z-10 h-full w-full" : "relative"}
`}
      >
        <Drawer openDrawer={openDrawer} drawerOpen={drawerOpen} />
      </div>

      <div className="grid-header">
        <Header openDrawer={openDrawer} />
      </div>

      <ViewNote
        note={selectedNote}
        viewSlide={viewSlide}
        viewOpen={viewOpen}
        className={`
    ${
      viewOpen
        ? "translate-x-0 fixed top-0 left-0 z-30 h-full w-full"
        : "hidden"
    } 
    transition-transform duration-300 ease-in-out
  `}
      />

      <main className="px-4 grid-main mt-24">
        <ul className="list_top rounded p-2">
          <li className="text-center">S/No</li>
          <li className="text-center">Autho</li>
          <li className="text-center">Title</li>
          <li className="text-center">file</li>
          <li className="text-center">date</li>
        </ul>

        {/* note rows */}
        {notes.map((note, index) => (
          <div key={note._id} className="flex mt-5 flex-col relative group">
            <ul className="list rounded py-2">
              <li className="text-center">{index + 1}</li>
              <li className="text-center">
                <ShortText text={note.author} limit={4} />
              </li>
              <li className="text-center">
                <ShortText text={note.title} limit={4} />
              </li>
              <li className="text-center">
                <ShortText text={note.file || "No File"} limit={4} />
              </li>
              <li className="text-center">
                {new Date(note.createdAt).toLocaleDateString()}
              </li>
            </ul>

            {/* ICONS: hidden by default, visible on hover */}
            <div
              className="opacity-0 group-hover:opacity-100 
                       translate-y-2 group-hover:translate-y-0 
                       transition-all duration-300 ease-in-out 
                       bg-white flex_row_center absolute py-2 px-2 m-auto gap-1 
                       border-2 left-[40%] lg:left-[45%] -top-9 rounded-md"
            >
              <FaEye
                size={30}
                color="black"
                onClick={() => {
                  setSelectedNote(note);
                  viewSlide();
                }}
                className="bg-blue-400 hover:bg-blue-700 px-1.5 rounded-lg cursor-pointer"
                title="View"
              />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AllNotes;
