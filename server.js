const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const notes = require('./db/db');

function makeNewNote() {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return newNote;
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const newNote = makeNewNote(req.body, notes);

    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    res.json(req.params.id);
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});