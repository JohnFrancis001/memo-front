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

  return (//main
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
      <div className={`grid-drawer ${drawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 ${drawerOpen ? "fixed top-0 left-0 z-10 h-full w-full" : "relative"}`}>
        <Drawer openDrawer={openDrawer} drawerOpen={drawerOpen} />
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

      <main className="px-4 py-6 grid-main">

  {/* Header Row */}
  <div className="flex justify-between items-center mb-6">

    <h2 className="text-xl font-semibold text-[#0d47a1]">
      My Notes
    </h2>

    {/* Add Button */}
    <button
      onClick={addSlide}
      className="
      flex items-center gap-2
      bg-[#0d47a1] hover:bg-blue-900
      text-white px-4 py-2
      rounded-lg shadow-md
      transition"
    >
      <MdAdd size={22} />
      Add Note
    </button>

  </div>

  {/* Notes Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

    {notes.map((note, index) => (
      <div
        key={note._id}
        className="
        bg-white border rounded-xl p-4
        shadow-sm hover:shadow-lg
        transition
        relative group"
      >

        {/* Card Header */}
        <div className="flex justify-between items-center mb-2">

          <span className="text-sm text-gray-400">
            #{index + 1}
          </span>

          <span className="text-xs text-gray-500">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>

        </div>

        {/* Title */}
        <h3 className="text-[#0d47a1] font-semibold mb-1">
          <ShortText text={note.title} limit={20} />
        </h3>

        {/* Description Preview */}
        <p className="text-sm text-gray-600 mb-3">
          <ShortText text={note.description} limit={60} />
        </p>

        {/* File Badge */}
        <div className="mb-4">
          <span
            className="
            text-xs px-3 py-1
            bg-blue-50 text-[#0d47a1]
            rounded-full"
          >
            {note.file ? "File Attached" : "No File"}
          </span>
        </div>

        {/* Actions */}
        <div
          className="
          flex justify-end gap-2
          opacity-0 group-hover:opacity-100
          transition"
        >

          <button
            onClick={() => {
              setSelectedNote(note);
              viewSlide();
            }}
            className="
            p-2 rounded-lg
            bg-blue-50 text-[#0d47a1]
            hover:bg-blue-100"
            title="View"
          >
            <FaEye />
          </button>

          <button
            onClick={() => {
              setSelectedNote(note);
              handleUpdate();
            }}
            className="
            p-2 rounded-lg
            bg-green-50 text-green-600
            hover:bg-green-100"
            title="Edit"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => {
              setSelectedId(note._id);
              handleDelete();
            }}
            className="
            p-2 rounded-lg
            bg-red-50 text-red-600
            hover:bg-red-100"
            title="Delete"
          >
            <FaTrash />
          </button>

        </div>

      </div>
    ))}

  </div>

</main>

    </div>
  );
};

export default Main;
