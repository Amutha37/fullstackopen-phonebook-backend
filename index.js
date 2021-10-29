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

app.use(
  morgan(":method :url :status :req[Content-Length] - :response-time ms :body")
);

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
  Person.countDocuments({})
    .then((count) => {
      const documentInfo =
        `<p>Phonebook has info for ${count} people</p>` +
        `<p>${new Date()}</p>`;
      response.send(documentInfo);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
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
});

// add new person

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
    .then((newPerson) => response.json(newPerson))
    .catch((error) => next(error));
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
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "validation Error") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

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
