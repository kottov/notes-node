/*jshint esversion: 6 */

const fs = require('fs');

var fetchNotes = () => {
    try { return JSON.parse(fs.readFileSync('./notes.json')); }
    catch(e) { return []; }
};

var saveNotes = (notes) => {
    fs.writeFileSync('./notes.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = { title, body };
    if(notes.filter((note) => note.title === title).length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => fetchNotes();

var getNote = (title) => {
    var notes = fetchNotes();
    return notes.filter((note) => title === note.title)[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

var logNote = (note) => console.log(`---\nTitle: ${note.title}\nBody: ${note.body}`);

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
