const notes = require('express').Router();
const uuid = require('uuid');

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// get route for specific note
notes.get('/:id', (req, res) => {
    const varId = req.params.title;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => notes.title === varId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

// Delete Route for a specific note
notes.delete('/:id', (req, res) => {
    const varId = req.params.id;

    console.log("ID deleted by the user" + varId);

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const data = json.filter((notes) => notes.id !== varId);

            writeToFile('./db/db.json', data);

            res.json(`Item ${varId} has been deleted`);
        });
});

// POST Route for a new note
notes.post('/', (req, res) => {

    let id = uuid.v4();
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNotes = {
            id,
            title,
            text,
        };

        console.log('new tittle' + newNotes.id,newNotes.title, newNotes.text);

        readAndAppend(newNotes, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');

    }
});

module.exports = notes;