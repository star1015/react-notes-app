import React, { useEffect, useState } from "react";
import { logger } from "workbox-core/_private";
import Folders from "../components/Folders";
import Notes from "../components/Notes";
import { fData, nData } from "../constant";

const NotesApp = () => {
  const [folders, setFolders] = useState(fData);
  const [notes, setNotes] = useState(nData);
  const [notesBySearchStr, setNotesBySearchStr] = useState();
  const [selectedFolderID, setSelectedFolderID] = useState();
  const [isRemovedCurrentNote, setIsRemovedCurrentNote] = useState(false);
  const [selectedNoteID, setSelectedNoteID] = useState();

  useEffect(() => {
    // We should get the notes and folders data from the server.
    // Call the api with fetch or axios to get datas.
    // After call, we should charge the datas using React hook useState: setFolders, setNotes.
    // Pending for now.
    // Try catch api call. If catch, then, we should save logger to the file.
    logger.error("error message here");
  }, []);

  const chooseFolder = (uid) => {
    setSelectedFolderID(uid);
  };

  const chooseNote = (uid) => {
    setSelectedNoteID(uid);
  };

  const removeNote = () => {
    if (!selectedNoteID) alert("Pls select the note you want to remove!");

    setIsRemovedCurrentNote(true);
    const data = notes && notes.filter((item) => item.id !== selectedNoteID);
    setNotes(data);
    // Call the endpoint to remove the specific note.
  };

  const handleSearchNote = (e) => {
    // Make it as lowercase whatever the current string is.
    const searchStr = e.target.value.toLowerCase();

    const notesBySeachStr = notes.filter((item) =>
      item.content.toLowerCase().includes(searchStr)
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
          isRemovedCurrentNote={isRemovedCurrentNote}
          setNotes={setNotes}
          chooseNote={chooseNote}
          initializeNotesBySearchStr={initializeNotesBySearchStr}
        />
      </div>
    </div>
  );
};
export default NotesApp;
