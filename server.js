// Node js package - fs for writing and reading files
const fs = require('fs');
//Node js package - express
const express = require('express');
// Node js package - path
const path = require('path');
// Node js package - uuid
const { v4: uuidv4 } = require('uuid');

//generate varID
const varID = uuidv4();

// using variable app calling the express function
const app = express();

// the PORT were information is located
const PORT = 3001;

// static public files
app.use(express.static(path.resolve(__dirname + "/public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send out the home page
//path join the directory name with the name of the file for an absolute file
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

// Send out to the notes page
//path join the directory name with the name of the file for an absolute file
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));


//listening for API notes and sending file
app.get("/api/notes", (req, res) => {
  console.log("hello");
})

//send a new note back to the server to be added to the list of notes
app.post("/api/notes", (req, res) => {
  console.log("hi there");
  let note = req.body.note;
  let notesProduct = note;

  //read the mock database file
  fs.readFile(path.resolve(__dirname, './db/db.json'), 'utf-8', function (err, data) {
    //send error 
    if (err) {
      console.log(err);
      res.status(200).send("Error");
      return
    } else {
      //parse data to make an object to work with in javascript
      data = JSON.parse(data)
      //testing for debugging
      console.log(data);

      //add generated random ID to a new note
      const newNote = {
        id: varID,
        title: '',
        text: ''
      }

      //add new ID number and new note to db.json
      data.push(newNote);
      //testing for debugging
      console.log(data);
    }
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(data), function (err) {
      if (err) {
        console.log("error");
        res.status(200).send("Error");
        return;
      } else {
        // send new information to a note
        res.send(req.body.note);
      }
    })
  })
})

// to listen at the PORT
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
)