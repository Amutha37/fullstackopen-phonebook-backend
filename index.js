const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.static("build"));

var morgan = require("morgan");

morgan.token("body", (req, res) => JSON.stringify(req.body));

//  jason-parser to access data to dd new notes in the request body in JSON format.
app.use(express.json());

app.use(
  morgan(":method :url :status :req[Content-Length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Ashaa George",
    date: "2019-05-30T17:30:31.098Z",
    number: "0678946633",
  },
  {
    id: 2,
    name: "Kishen George",
    date: "2019-05-30T17:30:31.098Z",
    number: "0678945533",
  },
  {
    id: 3,
    name: "Tamana Aurom",
    number: "040-123456",
  },
  {
    id: 4,
    name: "Amanda Steve",
    number: "39-44-5323523",
  },
  {
    id: 5,
    name: "Ryan Saimon",
    number: "12-43-234345",
  },
  {
    id: 6,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// fetch all the data
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// fetch all the data for summary infomation
app.get("/info", (request, response) => {
  const datalength = persons.length;
  const datetime = new Date();
  response.send(
    `<h5>Phonebook has info for ${datalength} people</h5>
    <h6>${datetime}</h6>`
  );
});

// Display single phonebook entry information and if not found set and error status code.

// check for individual id to load from the url to code to filter
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// deleting data
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((perperson) => perperson.id !== id);
  console.log(persons);
  response.status(204).end();
});

// add new person

const generateId = () => Math.floor(Math.random() * 100);

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  let autoid = generateId();
  let result = preventDoubleid(autoid);

  if (result) {
    return response.status(302).json({
      error: "This id already exist.",
    });
  }
  const person = {
    content: body.content,
    id: autoid,
    name: "Ada Lovelace",
    number: "",
    // name: "Ada Lovelace",
    // number: "39-44-553622523",
  };

  if (!person.name) {
    return response.status(204).json({
      error: "Name missing",
    });
  }
  if (!person.number) {
    return response.status(204).json({
      error: "Phone number missing",
    });
  }

  let chekname = nam(person.name);

  if (chekname) {
    return response.status(302).json({
      error: "This name already exist.",
    });
  }

  persons = persons.concat(person);
  console.log(persons.id);
  response.json(persons);
});

// checking status git
// prevent double entry id
const preventDoubleid = (sameid) =>
  persons.find(({ id }) => id.includes(sameid));

// check name from double entry
const nam = (n) => {
  return persons.find(({ name }) => name.includes(n));
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
