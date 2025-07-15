import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  //Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  //ViewNote State
  const [viewOpen, setViewOpen] = useState(false);
  //ConfirmateBox State
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  //ID State for updation and deletion
  const [selectedId, setSelectedId] = useState("");
  //state of updateNote
  const [updateOpen, setUpdateOpen] = useState(false);
  //re-fetch the date to have the updated data
  const [fetchNotes, setFetchNotes] = useState(() => () => null);

  //ConfirmationBox for handling the deletion
  const handleDelete = () => {
    setConfirmAction("delete this note");
    setConfirmVisible(true);
  };

  //ConfirmationBox for handling the updation
  const handleUpdate = () => {
    setConfirmAction("update this note");
    setConfirmVisible(true);
  };

  const deleteNote = async () => {
    // e.preventDefault();
    try {
      const delNote_res = await axios.delete(
        `http://localhost:5000/note/delete/${selectedId}`,
        { withCredentials: true }
      );
      if (delNote_res.status !== 200) {
        console.log("Not Working Properly!");
      }
      fetchNotes();
    } catch (e) {
      console.log(e);
    } finally{
        setSelectedId("");
    }
  };

  //next step after ConfirmationBox for handling the either deletion or updation
  const handleConfirm = () => {
    console.log(`Confirmed: ${confirmAction}`);
    if (confirmAction === "delete this note") {
      //Delete logic
      deleteNote();
    }
    if (confirmAction === "update this note") {
      updateSlide();
    }
    setSelectedId("");
    setConfirmVisible(false);
  };

  //function for changing the drawer state for toggling
  const openDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  //function for changing the ViewNote state for toggling
  const viewSlide = () => {
    setViewOpen((prev) => !prev);
  };

  //function for updateNote
  const updateSlide = () => {
    setUpdateOpen((prev) => !prev);
  };

  return (
    <UIContext.Provider
      value={{
        drawerOpen,
        openDrawer,
        viewOpen,
        viewSlide,
        handleConfirm,
        handleDelete,
        handleUpdate,
        confirmAction,
        confirmVisible,
        setConfirmVisible,
        updateOpen,
        updateSlide,
        setSelectedId,
        setFetchNotes,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
