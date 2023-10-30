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

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3001;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send out the home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.post("/api/newuser", (req, res) => {
  fs.writeFile("signup.txt", req.body.newuser, (err) => {
    if (err) return res.json({ status: "error" })
    res.json({ status: "success" })
  })
})

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);