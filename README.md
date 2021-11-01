# Initial set up up for starting the app

1. npm init
   {
   // ...
   "scripts": {
   "start": "node index.js",
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   // ...
   }

2. npm install express
3. npm install --save-dev nodemon
   {
   // ..
   "scripts": {
   "start": "node index.js",
   "dev": "nodemon index.js",
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   // ..
   }

### Installing logger

4. npm install morgan

5. npm run dev

# Phonebook backend Exercises 3..2 -3.6

### 3.1 List item of using base URL

.In this exercise I have to implement the return of hardcoded list of phonebook entris at the URL `http://localhost:3001/api/persons` using Node express.

### 3.2 List the information from of the api/person length and times.

.Expending the above exercise to implement the return summary of information "Phonebook has info for 4 people" and time of processing the request in the URL `http://localhost:3001/api/info`.

### 3.3 Search single item

.Display information for a single phonebook entry exp.` URL http://localhost:3001/api/persons/5`. using unique id.

### 3.4 HTTP DELETE

.Delete data using id parameter from URL
.To test the functionality if the data been delete run "send request" on the URL
`Get http://localhost:3001/api/persons/3`.
.Folder name 'request' is implemented to run REST

### 3.5 HTTP POST

.Add new note.
.Auto generate header content-type: with the help of json-parser / app.use(express.json()).
.Retrive data from body property of the request object.

.Create hard code data object to add new note.

### 3.6 Error handling for blank entry and double entry.

### 3.5 HTTP POST

.Validation check to display error message if name or number is missing.
. Prevent double entry.

### 3.6 Configure Morgan logger to show HTTP POST data log.

![Screen Shot 2021-09-27 at 11 25 26 am](https://user-images.githubusercontent.com/67087939/134832408-7e5b1672-f61a-4d11-844f-5200f8a49596.png)

### Exercises 3.9.-3.11. Connect backend to front end

6. npm install cors
   \*add this line of code in index.js
   const cors = require('cors')
   app.use(cors())

7. Add node_modules in '.gitignore'
   (before deploying)

# 3.10 Deploy app to backend Heroku

i) On root directory

- Read heroku documentation for deployment

  > heroku create
  > git push heroku main
  > npm run dev

- If there is any error display log to view them.

> heroku logs -t

# Heroku backend app address link :

`https://quiet-dawn-80146.herokuapp.com/api/persons`

After deploy we can now create production build or a version of the application which is optimised for production.

This can be don't in the frontend root with the command 'npm run build'.

The process for production build is listed in the frontend repository fullstackopen/part2/phonebook

#### 3.11 is production build which is described in the frontend repository

     fullstackopen/part2/phonebook

# 3.12 Create database using command line.

In this section we will create MongoDB Atlas cluster allows access.

1. Create a mongoDB database for phone book the model and save data is created mongo.js.

- Use command line arguments to pass the property to create a new data collection.

example passing 3 parameter on command line : > `node mongo.js yourpassword Anna 040-1234556`

- Use them as command-line arguments

const password = process.argv[2];
const person = new Person({
name: process.argv[3],
number: process.argv[4],
});

- This new entry data will be saved to the database.

If the `phonebook-app` database does not exit the mongoDB will create the database and create a document collection.

const url = `mongodb+srv://fullstack_amutha:${password}@cluster0.eqxje.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

3.13 - 3.14 Create, update and fetch all database from the database mongoDB.

3.13 Write mongoDB models `new mongoose.Schema ` to configure database configuration into its own module.

1. Test the front end fetch all data from backend mongoDB.

3.14 Change the backend so the new contact is added to the database.

3.15 Change the functionality to delete the contact in database.

3.16 Create a error handler middleware to handle error for invalid id.

3.17 Change the functionality to change and update existing contact in the database.

3.18 Change and update the handling of the `api/persons/:id` and `/info`. The should be handle by fetching the information form the database.Verify this works directly in browser, Postman or VS Code REST client.

![Screen Shot 2021-10-26 at 2 07 29 pm](https://user-images.githubusercontent.com/67087939/138802291-aa66b5db-2b1d-4c17-960d-15e44160fba9.png)

3.19 Phonebook database validation

- Currently the code validate for double name entry, but to create them directly with Postman or the VS Code REST client.

Moongoose does not offer the build-in validator so double data entry and this can be done by installing mongoose-unique-validator plugin.

> npm install --save mongoose-unique-validator

Documentation link for this installation can be found in :
`https://github.com/blakehaswell/mongoose-unique-validator#readme`

3.20 Catch error at frontend to display some form of error message when a validation error occur. This can be achived by catch error.

3.21 Deploying the database backend to production

This is a new "full stack" version. Create a new production build of the frontend and copy it to the backend repository. Make sure the appplication workd on local address `http://localhost:30001/`

- Push the new changes to Heroku
  > `git push heroku main`

* Make sure to verify that everything works as it should.

# Lint OR linter

Defination in short : Tools for performing static analysis of source code. It detects and flags error in programming languages, including stylistic error.
