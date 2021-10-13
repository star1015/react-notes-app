import React, { useState } from "react";

const Folders = ({
  folders,
  sortFolderNames,
  setSelectedFolderID,
  setSelectedNote,
}) => {
  const [visible, setVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState();

  const chooseFolder = (id) => {
    setSelectedFolderID(id);
    // Initialize the selected note's content.
    setSelectedNote(null);
  };

  const generateFolder = () => {
    // Unique new folder Id.
    const newFolderID = folders && folders.length + 1;

    // Hide the input first.
    setVisible(false);
    // Set the new folder ID as the selected one to use when creating a new note.
    setSelectedFolderID(newFolderID);

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

  const onPressEnter = (e) => {
    if (e.keyCode === 13) generateFolder();
  }

  return (
    <div className="folder-list">
      {/* FOLDERS LIST VIEW */}
      <ul>
        {folders &&
          folders.map((item) => {
            return (
              <li key={item.id}>
                <span onClick={() => chooseFolder(item.id)}>{item.name}</span>
              </li>
            );
          })}
        {/* NEW FOLDER INPUT */}
        <li
          className="new-folder-input"
          style={{ display: visible === true ? "block" : "none" }}
        >
          <input
            autoFocus={true}
            type="text"
            value={newFolderName}
            onChange={(e) => {
              setNewFolderName(e.target.value);
            }}
            onKeyDown={onPressEnter}
            onBlur={generateFolder}
          ></input>
        </li>
      </ul>
      {/* NEW FOLDER BUTTON */}
      <button
        onClick={(e) => {
          setVisible(true);
        }}
      >
        + Folder
      </button>
    </div>
  );
};
export default Folders;
