require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

//  jason-parser to access data to dd new notes in the request body in JSON format.
app.use(express.json());

// mongoDB

const Person = require("./models/person");

// const url = process.env.MONGODB_URI;
// mongoose.connect(url);

app.use(express.static("build"));

const morgan = require("morgan");

morgan.token("body", (req, res) => JSON.stringify(req.body));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(
  morgan(":method :url :status :req[Content-Length] - :response-time ms :body")
);

// let persons = [
//   {
//     id: 1,
//     name: "Ashaa George",
//     date: "2019-05-30T17:30:31.098Z",
//     number: "0678946633",
//   },
//   {
//     id: 2,
//     name: "Kishen George",
//     date: "2019-05-30T17:30:31.098Z",
//     number: "0678945533",
//   },
//   {
//     id: 3,
//     name: "Tamana Aurom",
//     number: "040-123456",
//   },
//   {
//     id: 4,
//     name: "Amanda Steve",
//     number: "39-44-5323523",
//   },
//   {
//     id: 5,
//     name: "Ryan Saimon",
//     number: "12-43-234345",
//   },
//   {
//     id: 6,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// fetch all the data
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });

  //  before mongoDB
  // response.json(persons);
});

// fetch all the data for summary infomation
app.get("/info", (request, response, next) => {
  const datalength = api / persons.length;
  console.log(persons);
  const datetime = new Date();
  Person.collection
    .countDocuments()
    .then((result) => {
      response.send(`<p>Phonebook has info on ${result} people.</p>
            <p>${datetime}</p>`);
    })
    .catch((error) => next(error));
  // response
  //   .send(
  //     `<h5>Phonebook has info for ${datalength} people</h5>
  //   <h6>${datetime}</h6>`
  //   )
  //   .catch((error) => next(error));
});

// Display single phonebook entry information and if not found set and error status code.

// check for individual id to load from the url to code to filter
app.get("/api/persons/:id", (request, response) => {
  // with mongoDB
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  // .then((person) => {
  //   response.json(person);
  // });

  // BEFORE mongoDB
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);

  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
});

// add new person
// const generateId = () => Math.floor(Math.random() * 100);

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  console.log(body);
  // with mongoDB
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      return savedPerson.toJSON();
    })
    .catch((error) => next(error));
  // person.save().then((savedPerson) => {
  //   response.json(savedPerson).catch((error) => next(error));
  // });

  // if (!body.content) {
  //   return response.status(400).json({
  //     error: "content missing",
  //   });
  // }

  // let autoid = generateId();
  // let result = preventDoubleid(autoid);

  // if (result) {
  //   return response.status(302).json({
  //     error: "This id already exist.",
  //   });
  // }
  // const person = {
  //   content: body.content,
  //   id: autoid,
  //   name: "Ada Lovelace",
  //   number: "",
  // };

  // if (!person.name) {
  //   return response.status(204).json({
  //     error: "Name missing",
  //   });
  // }
  // if (!person.number) {
  //   return response.status(204).json({
  //     error: "Phone number missing",
  //   });
  // }

  // let chekname = nam(person.name);

  // if (chekname) {
  //   return response.status(302).json({
  //     error: "This name already exist.",
  //   });
  // }

  // persons = persons.concat(person);
  // console.log(persons.id);
  // response.json(persons);
});

// update database
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// deleting database
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  // const id = Number(request.params.id);
  // persons = persons.filter((perperson) => perperson.id !== id);
  // console.log(persons);
  // response.status(204).end();
});

// checking status git
// prevent double entry id
// const preventDoubleid = (sameid) =>
//   persons.find(({ id }) => id.includes(sameid));

// check name from double entry
// const nam = (n) => {
//   return persons.find(({ name }) => name.includes(n));
// };

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);
// const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
