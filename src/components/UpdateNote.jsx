import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

// Update Note Component
const UpdateNote = ({ fetchNotes, selectedNote, updateSlide, updateOpen }) => {

  const [data, setData] = useState({
    title: "",
    description: ""
  });

  // Load selected note data
  useEffect(() => {
    if (selectedNote) {
      setData({
        title: selectedNote.title || "",
        description: selectedNote.description || ""
      });
    }
  }, [selectedNote]);

  // Update Handler
  const Update = async (e) => {
    e.preventDefault();

    try {
      
      await axios.put(
        `${import.meta.env.VITE_API_URL}/note/update/${selectedNote._id}`,
        data,
        {
          withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
        }
      );

      updateSlide();
      fetchNotes();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/30 backdrop-blur-sm
      transition-all duration-300
      ${updateOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
    >
      {/* Modal Box */}
      <form
        onSubmit={Update}
        className="
        relative bg-white rounded-2xl shadow-2xl
        w-[95%] sm:w-[90%] lg:w-[55%]
        h-auto max-h-[90%]
        p-6
        flex flex-col gap-6
        border"
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={updateSlide}
          className="
          absolute top-4 right-4
          bg-[#0d47a1] hover:bg-blue-900
          p-2 rounded-full text-white
          transition"
        >
          <MdClose size={20} />
        </button>

        {/* Header */}
        <h2
          className="
          text-xl lg:text-2xl font-semibold
          text-[#0d47a1]"
        >
          Update Note
        </h2>

        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="text-sm text-gray-600"
          >
            Title
          </label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter note title"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
              }))
            }
            className="
            border rounded-lg px-3 py-2
            outline-none
            focus:ring-2 focus:ring-blue-300
            focus:border-[#0d47a1]"
            required
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm text-gray-600"
          >
            Note Description
          </label>

          <textarea
            name="description"
            id="description"
            placeholder="Write your note here..."
            value={data.description}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
              }))
            }
            rows="5"
            className="
            border rounded-lg p-3
            resize-none
            outline-none
            focus:ring-2 focus:ring-blue-300
            focus:border-[#0d47a1]"
            required
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Replace File (Optional)
          </label>

          <input
            type="file"
            name="file"
            className="
            border rounded-lg
            px-3 py-2
            text-sm
            cursor-pointer
            file:mr-4
            file:border-0
            file:bg-[#0d47a1]
            file:text-white
            file:px-4
            file:py-2
            file:rounded-md
            hover:file:bg-blue-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
          mt-2
          bg-[#0d47a1]
          hover:bg-blue-900
          text-white
          py-2.5 rounded-lg
          font-medium
          transition
          shadow-md"
        >
          Update Note
        </button>

      </form>
    </div>
  );
};

export default UpdateNote;
