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
  const { drawerOpen, openDrawer, viewOpen, viewSlide } = useUI();
  const { isLoggedIn, loading, setLoading, login } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState([]);

  const nav = useNavigate();

  const verifyAuth = async () => {
    try {
      setLoading(true);
      const notes_res = await axios.get(`${import.meta.env.VITE_API_URL}/note/all`, {
        withCredentials: true,
      });
      if (notes_res.status === 200) {
        setNotes(notes_res.data.note);
        login();
      }
    } catch (e) {
      console.log("Error fetching notes:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);//main

  useEffect(() => {
    if (!isLoggedIn && !loading) nav("/log");
  }, [isLoggedIn, loading]);

  if (loading) return <Spinner>Loading</Spinner>;

  return (
    <div className="relative overflow-hidden layout-grid">

      {/* Drawer */}
      <div className={`grid-drawer ${drawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 ${drawerOpen ? "fixed top-0 left-0 z-10 h-full w-full" : "relative"}`}>
        <Drawer openDrawer={openDrawer} drawerOpen={drawerOpen} />
      </div>

      {/* Header */}
      <div className="grid-header">
        <Header openDrawer={openDrawer} />
      </div>
      
      {/* View Note Modal */}
      <ViewNote
        note={selectedNote}
        viewSlide={viewSlide}
        viewOpen={viewOpen}
        className={`${viewOpen ? "translate-x-0 fixed top-0 left-0 z-30 h-full w-full" : "hidden"} transition-transform duration-300 ease-in-out`}
      />

      {/* Main Content */}
      {/* <main className="px-4 pt-24 pb-10 flex flex-col gap-4"> */}
        <main className="px-4 py-6 grid-main">


        {/* Page Title Bar */}
        <div className="mb-4 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center justify-between">
          <h2 className="text-[#0d47a1] font-semibold text-lg">All Notes</h2>
          <span className="text-sm text-gray-600">Total: {notes.length}</span>
        </div>

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500">
            <div className="border-2 border-dashed border-blue-200 rounded-xl px-8 py-10 bg-blue-50">
              <h3 className="text-[#0d47a1] font-semibold text-lg mb-1">No Notes Found</h3>
              <p className="text-sm">Notes shared by users will appear here.</p>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {notes.map((note, index) => (
            <div key={note._id} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition relative group">

              {/* Card Header */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">#{index + 1}</span>
                <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Title */}
              <h3 className="text-[#0d47a1] font-semibold mb-1">
                <ShortText text={note.title} limit={20} />
              </h3>

              {/* Author */}
              <p className="text-sm text-gray-600 mb-2">
                <ShortText text={note.author} limit={15} />
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3">
                <ShortText text={note.description} limit={60} />
              </p>

              {/* File Badge */}
              <div className="mb-4">
                <span className="text-xs px-3 py-1 bg-blue-50 text-[#0d47a1] rounded-full">
                  {note.file ? "File Attached" : "No File"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setSelectedNote(note);
                    viewSlide();
                  }}
                  className="p-2 rounded-lg bg-[#0d47a1] hover:bg-blue-800 text-white"
                  title="View"
                >
                  <FaEye />
                </button>
              </div>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default AllNotes;
