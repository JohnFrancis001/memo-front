import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

// The Update Note component for updating the selected note - fetched from Main page
const UpdateNote = ({fetchNotes, selectedNote, updateSlide, updateOpen }) => {
  // state for saving note info for updation
  const [note, setNote] = useState({});

  useEffect(() => {
    setNote(selectedNote);
  }, [selectedNote])

  
  // The function - logic, to trigger the endpoint for updation via context api state fetched through Main page
  const updNote = async (e) => {
      e.preventDefault();
      try {
          const updNote_res = await axios.put(
              `${import.meta.env.VITE_API_URL}/note/update/${selectedNote._id}`,
              note,
              {
          withCredentials: true,
        }
    );
    if (!updNote_res) console.log("Note not updated");
    if (updNote_res.status === 200) {
        console.log("working properly, data updated");
        updateSlide();
        fetchNotes();
    }
} catch (e) {
    console.log(e);
}
};

  return (
    <div
      className={`h-screen flex justify-center items-center ${
        updateOpen ? "translate-y-0" : "-translate-y-full"
      } fixed top-0 left-0 w-full z-50 bg-white p-4 shadow-lg
        transform transition-transform duration-300 ease-in-out`}
    >
      {/* Trigger point to update note through the form */}
      <form
        onSubmit={updNote}
        className="h-[90%] lg:h-[80%] w-[90%] lg:w-[70%] bg-slate-100 flex justify-center items-center flex-col rounded-lg gap-2 relative"
      >
        <MdClose
          color="red"
          onClick={updateSlide}
          size={30}
          className="absolute top-5 right-5 addIcon cursor-pointer"
        />
        <div className="flex flex-col gap-2 w-[50%] lg:w-[35%]">
          <label htmlFor="title">Title</label>
          <input
            value={note.title || ""}
            onChange={(e) =>
              setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            className="px-2 py-1 outline-none"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col gap-2 w-[50%] lg:w-[35%]">
          <label htmlFor="description">Note</label>
          <textarea
            value={note.description || ""}
            onChange={(e) =>
              setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            className="max-h-40 lg:max-h-60 p-2 outline-none"
            name="description"
            id="description"
            placeholder="Note"
          >
          </textarea>
        </div>
        <div className="flex flex-col gap-2 w-[50%] lg:w-[35%]">
          <input
            onChange={(e) =>
              setNote((prev) => ({ ...prev, file: e.target.files[0] }))
            }
            name="file"
            type="file"
          />
        </div>
        <button className="card w-[50%] lg:w-[35%]">Update the Note</button>
      </form>
    </div>
  );
};

export default UpdateNote;
