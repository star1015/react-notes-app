import React from "react";

const Content = ({ selectedNote, saveNoteToNotes, saveContentToNote }) => {
  return (
    <div className="content">
      <p>{selectedNote.createdAt}</p>
      {/* CONTENT VIEW */}
      <textarea
        autoFocus={true}
        value={selectedNote.content}
        onChange={(e) => saveContentToNote(e.target.value)}
        onBlur={saveNoteToNotes}
      />
    </div>
  );
};
export default Content;
