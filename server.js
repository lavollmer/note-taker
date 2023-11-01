/*
  1. A route that sends the home page
  2. A route that sends the notes page

  3. Make routes matching the fetch requests coming from the client-side code

  db.json is the make-believe database

  When a request comes in for the data:
    - Read the file (fs.readFile)

  When a request comes in to make a new note:
    - Read the file 
    - Add the new data 
    - Write a new version of that file
*/

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
app.use(express.static("public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send out the home page
//path join the directory name with the name of the file for an absolute file
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));

// Send out to the notes page
//path join the directory name with the name of the file for an absolute file
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/notes.html")));

// fetch routes for writing from index.js
// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(note)
//   });

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//listening for API notes and sending file
app.get("/api/notes", (req, res) => {
  console.log("hello");
  //send information to index.html public file
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

//send a new note back to the server to be added to the list of notes
app.post("/api/notes", (req, res) => {
  console.log("hi there");
  let note = req.body.note;
  let notesProduct = note;

  //read the mock database file
  fs.readFile(path.join(__dirname, './Develop/db/db.json'), 'utf-8', function (err, data) {
    //send error 
    if (err) {
      console.log(err);
      res.status(200).send("Error");
      return
      //parse data and push data
    } else {
      newData = JSON.parse(data)

      const newNote = {
        id: varID,
        title: newData,
        text: newData
      }

      newData.push(newNote);
    }
    fs.writeFile(path.join(__dirname, './Develop/db/db.json'), JSON.stringify(newData), function (err) {
      if (err) {
        console.log("error");
        res.status(200).send("Error");
        return;
      } else {
        res.send(req.body.note);
      }
    })
  })
})

// app.delete("/api/notes/${id}", (res, req) => {
//   console.log("what's up");
// })

//when someone requests data going to need to read the file and send it back


//when request comes in to make a new note, read file what currently in there and add the new data and then write a new version of the file

//read the file, delete what's supposed to be deleted, then write the new file

// app.post("/api/newuser", (req, res) => {
//   fs.writeFile("signup.txt", req.body.newuser, (err) => {
//     if (err) return res.json({ status: "error" })
//     res.json({ status: "success" })
//   })
// })

// to listen at the PORT
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
)