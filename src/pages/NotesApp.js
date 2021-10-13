import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import Folders from "../components/Folders";
import Notes from "../components/Notes";
import { fData, nData } from "../constant";

const NotesApp = () => {
  const [folders, setFolders] = useState();
  const [notes, setNotes] = useState();
  const [selectedFolderID, setSelectedFolderID] = useState();
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() => {
    sortFolderNames(fData);
    setNotes(nData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveNoteToNotes = () => {
    const data = notes.map((item) => {
      if (item.id === selectedNote.id) item.content = selectedNote.content;
      return item;
    });
    setNotes(data);
  };

  const saveContentToNote = (value) => {
    setSelectedNote({ ...selectedNote, content: value });
    if (selectedNote.title === "New Note")
      setSelectedNote({
        ...selectedNote,
        title: getTheNewNoteTitle(value),
        content: value,
      });
  };

  const getTheNewNoteTitle = (value) => {
    let newNoteName = "";
    var lines = value.split("\n");
    newNoteName = lines && lines[0];
    return newNoteName;
  };

  const sortFolderNames = (tFolders) => {
    const data = tFolders.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    setFolders(data);
  };

  return (
    <div className="notes-app-container">
      <header className="app-header"></header>
      <div className="app-content">
        <Folders
          folders={folders}
          setSelectedFolderID={setSelectedFolderID}
          setSelectedNote={setSelectedNote}
          sortFolderNames={sortFolderNames}
        />
        <Notes
          notes={notes}
          selectedFolderID={selectedFolderID}
          setSelectedNote={setSelectedNote}
          setNotes={setNotes}
        />
        {selectedNote && (
          <Content
            selectedNote={selectedNote}
            saveNoteToNotes={saveNoteToNotes}
            saveContentToNote={saveContentToNote}
          />
        )}
      </div>
    </div>
  );
};
export default NotesApp;
