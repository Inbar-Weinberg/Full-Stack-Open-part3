"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");

//--

//-- use
app.use("/", express.json());
app.use(morgan(`tiny`));
app.use(cors());

app.use(express.static(`${process.cwd()}/Backend/build`));

app.get("/info", (request, response) => {
  const lengthOfPhoneBook = persons.length;
  request.date = new Date();
  response.send(
    `Phone book has info for ${lengthOfPhoneBook} people.</br>${request.date}`
  );
});

//---
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

//--- updated
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => response.status(404).end());
});

app.get(`${process.cwd()}/api/persons`, (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  console.log(`request.headers, ${request.headers}`);
  const body = request.body;
  console.log(body);

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  /*
  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }/*/
  let name = body.name;
  let number = body.number;

  const person = new Person({ name, number });
  person.save().then((savedNote) => {
    response.json(savedNote);
  });
});

//--
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
