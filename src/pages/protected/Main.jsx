import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import Header from "../../components/Header";
import Drawer from "../../components/Drawer";
import AddNote from "../../components/AddNote";
import ViewNote from "../../components/ViewNote";
import { useUI } from "../../contexts/CompTransits";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ConfirmBox from "../../components/ConfirmBox";
import UpdateNote from "../../components/UpdateNote";
import Spinner from "../../components/Spinner";
import { useUser } from "../../contexts/Username";
import ShortText from "../../components/utils/ShortText";

const Main = () => {
  const { isLoggedIn, login, loading, setLoading } = useAuth();
  const {
    drawerOpen,
    openDrawer,
    viewOpen,
    viewSlide,
    handleDelete,
    handleUpdate,
    handleConfirm,
    confirmAction,
    confirmVisible,
    setConfirmVisible,
    updateOpen,
    updateSlide,
    setSelectedId,
    setFetchNotes,
  } = useUI();
  const { getUser, name } = useUser();
  const [addOpen, setAddOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState([]);

  const nav = useNavigate();

  const verifyAuth = async (e) => {
    try {
      setLoading(true);
      const notes_res = await axios.get(`${import.meta.env.VITE_API_URL}/note`, {
        withCredentials: true,
      });
      if (notes_res.status === 200) {
        console.log("Notes found");
        console.log(notes_res.data);
        setNotes(notes_res.data.note);
        login();
        getUser();
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
    setFetchNotes(() => verifyAuth);
    verifyAuth();
  }, [name]);

  useEffect(() => {
    if (!isLoggedIn && !loading) nav("/log");
    getUser();
  }, [isLoggedIn, loading]);

  if (loading) {
    return <Spinner>Loading</Spinner>;
  }

  const addSlide = () => {
    setAddOpen((prev) => !prev);
  };

  return (
    <div className="relative overflow-hidden layout-grid">
      <div>
        <AddNote
          addSlide={addSlide}
          fetchNotes={verifyAuth}
          addOpen={addOpen}
        />
        <UpdateNote
          fetchNotes={verifyAuth}
          selectedNote={selectedNote}
          updateSlide={updateSlide}
          updateOpen={updateOpen}
        />
      </div>
      <div
        className={`grid-drawer 
  ${drawerOpen ? "translate-x-0" : "-translate-x-full"} 
  transition-transform duration-300 ease-in-out
  lg:translate-x-0
  ${drawerOpen ? "fixed top-0 left-0 z-10 h-full w-full" : "relative"}
`}
      >
        <Drawer name={name} openDrawer={openDrawer} />
      </div>
      <ViewNote
        note={selectedNote}
        viewSlide={viewSlide}
        viewOpen={viewOpen}
        className={`
    ${viewOpen ? "translate-x-0" : "-translate-x-full"} 
    transition-transform duration-300 ease-in-out
    lg:translate-x-0
    ${viewOpen ? "fixed top-0 left-0 z-29 h-full w-full" : "relative"}
  `}
      />

      <ConfirmBox
        show={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={handleConfirm}
        action={confirmAction}
      />

      <div className="grid-header">
        <Header name={name} openDrawer={openDrawer} />
      </div>

      <main className="px-4 grid-main mt-10">
        <div className="flex_row_center">
          <MdAdd
            onClick={addSlide}
            size={100}
            className="addIcon cursor-pointer"
          />
        </div>
        <ul className="list_top rounded p-2">
          <li className="text-center">S/No</li>
          <li className="text-center">Autho</li>
          <li className="text-center">Title</li>
          <li className="text-center">file</li>
          <li className="text-center">date</li>
        </ul>

        {/* NOTE ROW */}
        {notes.map((note, index) => (
          <div key={note._id} className="flex mt-5 flex-col relative group">
            <ul className="list rounded py-2">
              <li className="text-center">{index + 1}</li>
              <li className="text-center">
                <ShortText text={name} limit={4} />
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
              <FaEdit
                size={30}
                color="grey"
                onClick={() => {
                  setSelectedNote(note);
                  handleUpdate();
                }}
                className="bg-green-400 hover:bg-green-700 px-1.5 rounded-lg cursor-pointer"
                title="Update"
              />
              <FaTrash
                size={30}
                color="white"
                onClick={() => {
                  setSelectedId(note._id);
                  handleDelete();
                }}
                className="bg-red-400 hover:bg-red-700 px-1.5 rounded-lg cursor-pointer"
                title="Delete"
              />
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

export default Main;
