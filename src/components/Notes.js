import React from "react";

const Notes = ({ notes, selectedFolderID, setSelectedNote, setNotes }) => {
  const generateNote = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
    // Generate note object with unique ID.
    const newNoteObject = {
      id: notes && notes.length + 1,
      title: "New Note",
      content: "",
      folderId: selectedFolderID,
      createdAt: (new Date()).toLocaleDateString("en-US", options),
      modifiedAt: (new Date()).toLocaleDateString("en-US", options)
    };

    // Set the new note as selected one.
    setSelectedNote(newNoteObject);

    // Save the new note into notes array.
    const data = [...notes, newNoteObject];
    setNotes(data);
  };
  console.log(notes);
  return (
    <div className="notes-list">
      {/* NOTES VIEW */}
      <ul>
        {notes &&
          notes
            .filter((item) => item.folderId === selectedFolderID)
            .map((item) => {
              return (
                <li key={item.id}>
                  <span onClick={() => setSelectedNote(item)}>
                    {item.title}
                  </span>
                </li>
              );
            })}
      </ul>
      {selectedFolderID && <button onClick={generateNote}>+ Note</button>}
    </div>
  );
};
export default Notes;
