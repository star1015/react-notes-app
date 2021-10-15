import React from "react";

const Content = ({ selectedNote, saveNoteToNotes }) => {
  return (
    <div className="content">
      <p>{selectedNote.createdAt}</p>
      {/* CONTENT VIEW */}
      <textarea
        autoFocus={true}
        value={selectedNote.content}
        onChange={(e) => saveNoteToNotes(e.target.value)}
        onBlur={(e) => saveNoteToNotes(e.target.value)}
      />
    </div>
  );
};
export default Content;
