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
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            saveNoteToNotes();
          }
        }}
        onBlur={saveNoteToNotes}
      />
    </div>
  );
};
export default Content;
