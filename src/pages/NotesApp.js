import React, { useState } from "react";
import Folders from "../components/Folders";
import Notes from "../components/Notes";

const NotesApp = () => {
  const [selectedFolderID, setSelectedFolderID] = useState();

  const chooseFolder = (id) => {
    setSelectedFolderID(id)
  };

  return (
    <div className="notes-app-container">
      <header className="app-header"></header>
      <div className="app-content">
        <Folders chooseFolder={chooseFolder} />
        <Notes selectedFolderID={selectedFolderID} />
      </div>
    </div>
  );
};
export default NotesApp;
