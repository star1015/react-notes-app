import React, { useState } from "react";
import { sort_by } from "../utils/CustomFunctions";

const Folders = ({ folders, setFolders, chooseFolder }) => {
  const [visible, setVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState();
  const [curFolderID, setCurrentFolderID] = useState();

  const sortFolderNames = (tFolders) => {
    const data = tFolders.sort(
      sort_by("name", false, (a) => a && a.toUpperCase())
    );
    setFolders(data);
  };

  const generateFolder = () => {
    // Unique new folder Id.
    const newFolderID = folders && folders.length + 1;

    // Hide the input first.
    setVisible(false);
    // Set the new folder ID as the selected one to use when creating a new note.
    chooseFolder(newFolderID);

    // Generate folder object with unique ID.
    const newFolderObject = {
      id: newFolderID,
      name: newFolderName,
    };

    const data = [...folders, newFolderObject];
    sortFolderNames(data);

    // Initialize the input.
    setNewFolderName("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      generateFolder();
    }
  };

  return (
    <div className="folder-list">
      {/* FOLDERS LIST VIEW */}
      <ul>
        {folders &&
          folders.map((item) => {
            return (
              <li
                key={item.id}
                className={`${
                  curFolderID === item.id ? "selected" : "unselected"
                }`}
                onClick={() => {
                  setCurrentFolderID(item.id);
                  chooseFolder(item.id);
                }}
              >
                <span>{item.name}</span>
              </li>
            );
          })}
        {/* NEW FOLDER INPUT */}
        <li
          className="new-folder-input"
          style={{ display: visible === true ? "block" : "none" }}
        >
          {/* AUTO FOCUS SHOULD WORK. It seems after chrome has been updated, we should add something more. 
              Pending for now - RESEARCH STEP*/}
          <input
            autofocus
            type="text"
            value={newFolderName}
            onChange={(e) => {
              setNewFolderName(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onBlur={generateFolder}
          ></input>
        </li>
      </ul>
      {/* NEW FOLDER BUTTON */}
      <button
        className="btn-create"
        onClick={(e) => {
          setVisible(true);
        }}
      >
        +
      </button>
    </div>
  );
};
export default Folders;
