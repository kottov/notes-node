/*jshint esversion: 6 */

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

var titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

var bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};



var argv = yargs
    .command('add', 'Add new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'Print list of all notes')
    .command('read', 'Print the note by title', {
        title: titleOptions
    })
    .command('remove', 'Remove the note by title', {
        title: titleOptions
    })
    .help()
    .argv;
var command = yargs.argv._[0];

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(note) { 
        console.log('New note created');
        notes.logNote(note); 
    } else { console.log('Something went wrong.'); }
} else if(command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Print ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));
} else if(command === 'read') {
    var note = notes.getNote(argv.title);
    if(note) {
        console.log('The note found');
        notes.logNote(note);
    } else { console.log('Note not found'); }
} else if(command === 'remove') {
    var isRemoved = notes.removeNote(argv.title);
    var message = isRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}