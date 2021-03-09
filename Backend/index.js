"use strict";
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },

  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-324345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

const express = require("express");
const app = express();
const morgan = require("morgan");

//-- use
app.use(express.json());
app.use(morgan(`tiny`));

app.use("/",express.static(`${process.cwd()}/Backend/build`));

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const lengthOfPhoneBook = persons.length;
  request.date = new Date();
  response.send(
    `Phone book has info for ${lengthOfPhoneBook} people.</br>${request.date}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) response.json(person);
  response.status(404).end();
});

//---
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

//---
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  console.log(request.headers);
  const body = request.body;

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number || false,
    id: generateId(),
  };

  persons = persons.concat(person);
  console.log(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
