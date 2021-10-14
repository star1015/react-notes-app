# MacOS Notes App - React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

## Functionality

### Folder List
- Shown in the left-most sidebar (see screenshot above)
- Folders listed in alphabetical order
- Ability to create new folders

### Notes List
- Shown in the middle panel (see screenshot above)
- Notes listed for the currently selected folder
- Notes listed in order of most recently modified
- Ability to create new notes in the selected folder
- The first line of the note’s content is used as the title for the listing
- Ability to select a note from the list and start editing it
- Ability to delete currently selected note

### Note Editor
- Shown in the right-most panel (see screenshot above)
- Ability to edit the note's content
- Does NOT need to support WYSIWYG editing, simple text is sufficient
- Should auto-save when the “Return/Enter” key is pressed on the keyboard

### Extra Credit
- Write unit tests. For the sake of time, you can just write a few tests to demonstrate this
skill.
- Ability to toggle (open/close) the Folder List sidebar
- The second line of the note's content is used as a short text preview in the Notes List○ Display an alert or confirmation when your note has unsaved changes when you switch
to a different note or folder
- Ability to search through all notes (by content) and display matching notes in the middle
panel (Notes List). Clearing the search term would show all notes.
