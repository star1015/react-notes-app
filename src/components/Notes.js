import React, { useEffect, useState } from "react";
import { sort_by } from "../utils/CustomFunctions";
import Content from "./Content";

const Notes = ({
  notes,
  isRemovedCurrentNote,
  selectedFolderID,
  setNotes,
  chooseNote,
  initializeNotesBySearchStr,
}) => {
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() => {
    if (notes && isRemovedCurrentNote) {
      const data = notes.filter((item) => item.id === selectedNote && selectedNote.id);
      if (data && data.length === 0) setSelectedNote(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRemovedCurrentNote]);

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
    // To display the original notes, we should remove the temp notes which has been generated by search str.
    initializeNotesBySearchStr();

    // Generate note object with unique ID.
    const newNoteObject = {
      id: notes && notes.length + 1,
      title: "New Note",
      subTitle: "",
      content: "",
      folderId: selectedFolderID,
      createdAt: getDateAndTime(),
      modifiedAt: getDateAndTime(),
    };

    // Set the new note as selected one.
    setSelectedNote(newNoteObject);
    // Save the new note into notes array.
    const data = [...notes, newNoteObject];
    setNotes(data);
  };

  const checkTheContentHasOnlyTitleOrAnyMoreText = (value) => {
    var lines = value.split("\n");
    return lines.length === 1 ? true : false;
  }
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
    if (lines && lines.length > 1)
      newNoteName = lines[1];
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
  const saveNoteToNotes = (value) => {
    const data = notes.map((item) => {
      if (item.id === selectedNote.id) {
        item.title = getTheNewNoteTitle(value);
        // When user remove other texts and keep only the title in the text.
        // The subTitle should be initialized.
        if (checkTheContentHasOnlyTitleOrAnyMoreText(value)) item.subTitle = "";

        // If subTitle already has been set. No need to update anymore.
        item.subTitle = getTheSubTitleOfNote(value).substr(0, 5);
        item.content = value;
      }
      return item;
    });
    setNotes(sortNotesByDate(data));
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
                  item.folderId === selectedFolderID
              )
              .map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      setSelectedNote(item);
                      chooseNote(item.id);
                    }}
                  >
                    <div className="item">
                      <p className="title">{item.title}</p>
                      <p className="date">
                        {item.modifiedAt}{" "}
                        <span>
                          {item.subTitle}
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
        </ul>
        {selectedFolderID && (
          <button className="btn-create" onClick={generateNote}>
            +
          </button>
        )}
      </div>
      {selectedNote && (
        <Content
          selectedNote={selectedNote}
          saveNoteToNotes={saveNoteToNotes}
        />
      )}
    </React.Fragment>
  );
};
export default Notes;
