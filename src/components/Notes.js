import React, { useEffect, useState } from "react";
import { nData } from "../constant";
import { sort_by } from "../utils/CustomFunctions";
import Content from "./Content";

const Notes = ({ selectedFolderID }) => {
  const [notes, setNotes] = useState();
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() => {
    setNotes(nData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDateAndTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
  };

  const generateNote = () => {
    // Generate note object with unique ID.
    const newNoteObject = {
      id: notes && notes.length + 1,
      title: "New Note",
      content: "",
      folderId: selectedFolderID,
      createdAt: getDateAndTime(),
      modifiedAt: getDateAndTime(),
      isNew: true,
    };

    // Set the new note as selected one.
    setSelectedNote(newNoteObject);
    // Save the new note into notes array.
    const data = [...notes, newNoteObject];
    setNotes(data);
  };

  // Get the title of note.
  const getTheNewNoteTitle = (value) => {
    let newNoteName = "";
    var lines = value.split("\n");
    newNoteName = lines && lines[0];
    return newNoteName;
  };

  // Get the sub title of note.
  const getTheSubTitleOfNote = (value) => {
    let newNoteName = "";
    var lines = value.split("\n");
    lines.map((item) => {
      if (item && item.length > 0) newNoteName = item;
      return item;
    });
    return newNoteName;
  };

  // Sort the notes list by modified date.
  const sortNotesByDate = (data) => {
    // Error handler
    if (!data) return;

    const sortByDate = data.sort(
      sort_by("modifiedAt", true, (a) => new Date(a))
    );
    return sortByDate;
  };

  // Save note to notes list.
  const saveNoteToNotes = () => {
    setSelectedNote({ ...selectedNote, isNew: false });

    const data = notes.map((item) => {
      if (item.id === selectedNote.id) {
        item.title = selectedNote.title;
        item.content = selectedNote.content;
        item.isNew = false;
      }
      return item;
    });
    setNotes(sortNotesByDate(data));
  };

  // Save content to a specific note.
  const saveContentToNote = (value) => {
    setSelectedNote({
      ...selectedNote,
      title: getTheNewNoteTitle(value),
      content: value,
      isNew: true,
    });
  };

  return (
    <React.Fragment>
      <div className="notes-list">
        {/* NOTES VIEW */}
        <ul>
          {notes &&
            notes
              .filter(
                (item) =>
                  item.folderId === selectedFolderID && item.isNew === false
              )
              .map((item) => {
                return (
                  <li key={item.id}>
                    <div className="item">
                      <p
                        className="title"
                        onClick={() => {
                          setSelectedNote(item);
                        }}
                      >
                        {item.title}
                      </p>
                      <p className="date">
                        {item.modifiedAt}{" "}
                        <span>
                          {getTheSubTitleOfNote(item.content).substring(1, 5)}
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
          {selectedNote && selectedNote.isNew === true && (
            <li key={selectedNote.id}>
              <div className="item">
                <p
                  className="title"
                  onClick={() => {
                    setSelectedNote(selectedNote);
                  }}
                >
                  {selectedNote.title}
                </p>
                <p className="date">
                  {selectedNote.modifiedAt}{" "}
                  <span>
                    {getTheSubTitleOfNote(selectedNote.content).substring(0, 5)}
                  </span>
                </p>
              </div>
            </li>
          )}
        </ul>
        {selectedFolderID && <button className="btn-create" onClick={generateNote}>+</button>}
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
