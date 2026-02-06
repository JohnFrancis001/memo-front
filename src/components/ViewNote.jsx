import React from "react";
import { MdClose } from "react-icons/md";

const ViewNote = ({ viewSlide, viewOpen, note }) => {
  if (!note) return null;

  return (
    <div
      className={`
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/30 backdrop-blur-sm
      transition-all duration-300
      ${viewOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
    >
      {/* Modal Container */}
      <div
        className="
        relative bg-white rounded-2xl shadow-2xl
        w-[95%] sm:w-[90%] lg:w-[75%]
        h-[90%] lg:h-[80%]
        flex flex-col lg:flex-row
        overflow-hidden
        border"
      >
        {/* Close Button */}
        <button
          onClick={viewSlide}
          className="
          absolute top-4 right-4
          bg-[#0d47a1] hover:bg-blue-900
          p-2 rounded-full text-white
          transition"
        >
          <MdClose size={22} />
        </button>

        {/* LEFT INFO PANEL */}
        <div
          className="
          w-full lg:w-[35%]
          p-6
          border-b lg:border-b-0 lg:border-r
          flex flex-col gap-6
          bg-white"
        >
          {/* Title */}
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Title
            </p>
            <h2
              className="
              text-lg lg:text-xl font-semibold
              text-[#0d47a1]
              border rounded-lg
              px-3 py-2"
            >
              {note.title}
            </h2>
          </div>

          {/* File */}
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Attached File
            </p>

            <div
              className="
              text-sm lg:text-base
              border rounded-lg
              px-3 py-2
              text-gray-700
              break-all"
            >
             {note.file ? (
  <div className="flex gap-2">
    <a
      href={`${import.meta.env.VITE_API_URL}/${note.file}`}
      target="_blank"
      className="text-sm text-blue-600 underline"
    >
      {note.file}
    </a>
    
  </div>
) : (
  <span className="text-xs text-gray-400">
    No file attached
  </span>
)}

            </div>
          </div>
        </div>

        {/* RIGHT CONTENT PANEL */}
        <div
          className="
          w-full lg:w-[65%]
          p-6
          flex flex-col
          bg-white"
        >
          <h3
            className="
            text-xl font-semibold
            text-[#0d47a1]
            mb-4"
          >
            Note Description
          </h3>

          {/* Scrollable Description */}
          <div
            className="
            flex-1
            border rounded-xl
            p-4
            overflow-y-auto
            text-gray-700
            leading-relaxed
            text-sm lg:text-base"
          >
            {note.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
