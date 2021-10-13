import React, { useEffect, useState } from "react";
import { nData } from "../constant";
import Content from "./Content";

const Notes = ({ selectedFolderID }) => {
  const [notes, setNotes] = useState();
  const [selectedNote, setSelectedNote] = useState();
  const [isNewNote, setIsNewNote] = useState(false);

  useEffect(() => {
    setNotes(nData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateNote = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      time: "numeric",
    };
    // Generate note object with unique ID.
    const newNoteObject = {
      id: notes && notes.length + 1,
      title: "New Note",
      content: "",
      folderId: selectedFolderID,
      createdAt: new Date().toLocaleDateString("en-US", options),
      modifiedAt: new Date().toLocaleDateString("en-US", options),
      isNew: true,
    };

    // Set the new note as selected one.
    setSelectedNote(newNoteObject);
    setIsNewNote(true);
    // Save the new note into notes array.
    const data = [...notes, newNoteObject];
    setNotes(data);
  };

  const getTheNewNoteTitle = (value) => {
    let newNoteName = "";
    var lines = value.split("\n");
    newNoteName = lines && lines[0];
    return newNoteName;
  };

  const saveNoteToNotes = () => {
    if (isNewNote) setIsNewNote(false);

    const data = notes.map((item) => {
      if (item.id === selectedNote.id) {
        item.title = selectedNote.title;
        item.content = selectedNote.content;
        item.isNew = false;
      }
      return item;
    });
    setNotes(data);
  };

  const saveContentToNote = (value) => {
    setSelectedNote({
      ...selectedNote,
      title: getTheNewNoteTitle(value),
      content: value,
      isNew: false,
    });
  };
  return (
    <React.Fragment>
      <div className="notes-list">
        {/* NOTES VIEW */}
        <ul>
          {notes &&
            notes
              .filter((item) => item.folderId === selectedFolderID && item.isNew === false )
              .map((item) => {
                return (
                  <li key={item.id}>
                    <span
                      onClick={() => {
                        setIsNewNote(false);
                        setSelectedNote(item);
                      }}
                    >
                      {item.title}
                    </span>
                  </li>
                );
              })}
          {selectedNote && selectedNote.isNew === true && (
            <li key={selectedNote.id}>
              <span onClick={() => setSelectedNote(selectedNote)}>
                {selectedNote.title}
              </span>
            </li>
          )}
        </ul>
        {selectedFolderID && <button onClick={generateNote}>+ Note</button>}
      </div>
      {selectedNote && (
        <Content
          selectedNote={selectedNote}
          saveNoteToNotes={saveNoteToNotes}
          saveContentToNote={saveContentToNote}
        />
      )}
    </React.Fragment>
  );
};
export default Notes;
