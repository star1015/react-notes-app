import React, { useEffect, useState } from "react";
import Folders from "../components/Folders";
import Notes from "../components/Notes";
import { fData, nData } from "../constant";

const NotesApp = () => {
  const [folders, setFolders] = useState(fData);
  const [notes, setNotes] = useState(nData);
  const [notesBySearchStr, setNotesBySearchStr] = useState();
  const [selectedFolderID, setSelectedFolderID] = useState();
  const [selectedNoteID, setSelectedNoteID] = useState();

  useEffect(() => {
    // We should get the notes and folders data from the server.
    // Call the api with fetch or axios to get datas.
    // After call, we should charge the datas using React hook useState: setFolders, setNotes.
    // Pending for now.
  }, []);

  const chooseFolder = (uid) => {
    setSelectedFolderID(uid);
  };

  const chooseNote = (uid) => {
    setSelectedNoteID(uid);
  };

  const removeNote = () => {
    if (!selectedNoteID) alert("Pls select the note you want to remove!");

    const data = notes && notes.filter((item) => item.id !== selectedNoteID);
    setNotes(data);
    // Call the endpoint to remove the specific note.
  };

  const handleSearchNote = (e) => {
    const notesBySeachStr = notes.filter((item) =>
      item.content.includes(e.target.value)
    );

    setNotesBySearchStr(notesBySeachStr);
  };

  // Initialize the temp array for notes to display the original ones.
  const initializeNotesBySearchStr = () => {
    setNotesBySearchStr(null);
  };

  return (
    <div className="notes-app-container">
      <header className="app-header">
        <div className="toolbar-before" />
        <div className="toolbar">
          <div className="items">
            <button onClick={removeNote}>- D</button>
            <input
              type="text"
              placeholder="Search note"
              onChange={(e) => handleSearchNote(e)}
            />
          </div>
        </div>
        <div className="toolbar-after" />
      </header>
      <div className="app-content">
        <Folders
          folders={folders}
          chooseFolder={chooseFolder}
          setFolders={setFolders}
        />
        <Notes
          notes={notesBySearchStr ? notesBySearchStr : notes}
          selectedFolderID={selectedFolderID}
          setNotes={setNotes}
          chooseNote={chooseNote}
          initializeNotesBySearchStr={initializeNotesBySearchStr}
        />
      </div>
    </div>
  );
};
export default NotesApp;
