import React from "react";
import { MdClose } from "react-icons/md";

// The View -reusable-component for both only-user and all-notes pages.
const ViewNote = ({ viewSlide, viewOpen, note }) => {
  if (!note) return null;

  return (
    <div
      className={`bg-white ${viewOpen ? "translate-x-0" : "translate-x-[200%]"} 
    transition-transform duration-300 ease-in-out
    ${
      viewOpen ? "fixed top-0 left-0 z-40 h-full w-full" : "fixed top-0 right-0"
    } h-screen w-screen flex justify-center items-center`}
    >
      <div className="h-[90%] lg:h-[80%] w-[90%] lg:w-[70%] shadow-xl flex justify-center items-center flex-row relative border-8 rounded-lg p-2">
        <MdClose
          onClick={viewSlide}
          color="red"
          size={30}
          className="absolute top-5 right-5 addIcon cursor-pointer"
        />
        <div
          className="h-full w-[40%] lg:w-[30%] flex flex-col justify-center items-center gap-10 lg:gap-5 text-black shadow-md rounded-tl-md rounded-bl-md"
          style={{
            background:
              "linear-gradient(to bottom right, #d3cce3, #e9e4f0, #a1c4fd)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex flex-col w-[50%] lg:w-[95%] lg:flex-row justify-start">
            <h3 className="text-md lg:text-xl px-2 py-1 h-10 rounded flex justify-start lg:justify-center items-center">
              Title :
            </h3>
            <h3 className="lg:text-lg text-[12px] px-2 py-1 rounded-lg flex justify-start lg:justify-center items-center border-4 text-black">
              {note.title}
            </h3>
          </div>

          <div className="flex flex-col w-[50%] lg:w-[95%] lg:flex-row justify-start">
            <h3 className="px-2 py-1 h-10 rounded flex justify-start lg:justify-center items-center text-md lg:text-xl">
              File :
            </h3>
            <h3 className="px-2 py-1 h-10 rounded-lg flex justify-start lg:justify-center items-center text-[12px] lg:text-lg text-black border-4">
              {note.file || "No File"}
            </h3>
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-center gap-1 h-full w-[60%] lg:w-[70%] text-white shadow-lg rounded-tr-md rounded-br-md"
          style={{
            background: "linear-gradient(to bottom right, #0d47a1, #008080)",
            boxShadow: "0 4px 10px rgba(13, 71, 161, 0.3)",
          }}
        >
          <h3 className="px-2 py-1 h-10 rounded flex items-center text-xl text-white">
            Note :{" "}
          </h3>
          <p className="bg-slate-100 min-h-[40%] w-[50%] max-w-[70%] text-sm lg:text-lg px-2 py-2 outline-none rounded flex box-border text-black">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
