import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

{/* A component to add note, Even though it is note reused after the main page. Just for practice to make reusable components */}
const AddNote = ({ addSlide, addOpen, fetchNotes }) => {
  {/* A state of data that contains the info about the uploading note */}
  const [data, setData] = useState({});

  {/* This function helps to trigger the backend endpoint to add in the DB */}
  const Add = async (e) => {
    {/* To not trigger the page */}
    e.preventDefault();
    try {
      const addData = await axios.post(`${import.meta.env.VITE_API_URL}/note/add`, data, {
        withCredentials: true,
      });
      if (!addData) console.log("Note is not added,something is wrong error");
      console.log("Working Fine, Note Added");
      {/* A prop function to help slide back the AddNote Component */}
      addSlide();
      {/* A prop function to help with the fetching of recent data on the main page */}
      fetchNotes();
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <div
      className={`h-screen flex justify-center items-center ${
          addOpen ? "translate-y-0" : "-translate-y-full"
        } fixed top-0 left-0 w-full z-50 bg-white p-4 shadow-lg
        transform transition-transform duration-300 ease-in-out`}
        >
      <form
        onSubmit={Add}
        className="h-[90%] lg:h-[80%] w-[90%] lg:w-[70%] bg-slate-100 flex justify-center items-center flex-col rounded-lg gap-2 relative"
      >
        <MdClose
          color="red"
          onClick={addSlide}
          size={30}
          className="absolute top-5 right-5 addIcon cursor-pointer"
        />
        <div className="flex flex-col gap-2 w-[50%] lg:w-[35%]">
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => {
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
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
            onChange={(e) => {
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
            className="max-h-40 lg:max-h-60 p-2 outline-none"
            name="description"
            id="description"
            placeholder="Note"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 w-[50%] lg:w-[35%]">
          <input
            onChange={(e) => {
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
            }}
            type="file"
          />
        </div>
        <button className="card w-[50%] lg:w-[35%]">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
