# Initial setup up for starting the app

( > indicates command line execution)

1. `npm init`
   Make changes to package.json adding `start` script. This allow us to run from command line :

   > npm script `npm start` instead of node command `node index.js` .
   > ![Screen Shot 2021-11-02 at 9 56 40 am](https://user-images.githubusercontent.com/67087939/139752814-ed4cf214-d4e1-4999-8b53-d339dbb5acb5.png)

   run test the index.js file with any test code.

- Continue setting up the backend with Node express to ease server side development. This is how we interact with database and the front end browser.

  > `npm install express`

(Dependencies will be added to the package.json. The source code for this dependency is install to the node_modules.We can update the dependencies of the project when the any of the patch, minor and major version express change with `npm update`)

When we work on this project on another computer we can install the up-to-date dependencies ot the project defined in package.json with the command :

> `npm install`

The express module can be now imported in the code file for use.

#### Installing Nodemon

Unlike React app where the browser automatically reloaded after changes made in the source code, this project index.js file has to be shut down with CTL+C to restart the application so we can see the changes.

Nodemon watches the files in the directory in which nodemon was started at the script file for any changes and Nodemon will automatically restart your node application. The browser needs to be reloaded.

> `npm install --save-dev nodemon`

We can start the application with command line execution `node_modules/.bin/nodemon index.js`.
This is long and not so pleasant. We can use the script to defile the the execution of the nodemon.

Make changes to the script
![Screen Shot 2021-11-02 at 9 56 13 am](https://user-images.githubusercontent.com/67087939/139752775-af768fdd-0758-4223-8584-8f7dec73454d.png)

> `npm run dev`

#### RESTful API

The source code phonebook person data is now called resources in RESTful thinking. Let's create a resource's associated unique URL address.

EXAMPLE :
The root URL of our service will be www.example.com/api
Defining a unique address of a person will be www.example.com/api/person/10.

REST refers to a uniform interface, which means a consistent way of defining an interface that makes it possible for the system to cooperate. More information about RESTful API can be found in the web documentation.

We can defined the execution of different operation on resources by the HTTP verb :

![Screenshot 2021-11-02 at 9 23 57 am](https://user-images.githubusercontent.com/67087939/139749996-66edff42-7a11-499f-9d25-5dbebbd1949a.png)

Use Postman or VS Code REST client to test operation.
If you are using VS Code REST install the extension, create file `.rest` use the operation to test.

## 3.1 - 3.6 Implementing the REST API using node express using hard coded object data to work on initially.

The initial step of the backend is all described in the steps above.

This backend is recommended to be dedicated into a new git repository.

#### 3.1 In this exercise I have to implement the return of hardcoded list of phonebook entries at the URL

`http://localhost:3001/api/persons` using Node express.

#### 3.2 List the information from the api/person length and times.

.Expanding the above exercise to implement the return summary of information "Phonebook has info for 4 people" and time of processing the request in the URL `http://localhost:3001/api/info`.

#### 3.3 Search single item

.Display information for a single phonebook entry exp.` URL http://localhost:3001/api/persons/5`. using unique id.

#### 3.4 HTTP DELETE

.Delete data using id parameter from URL
.To test the functionality if the data been delete run "send request" on the URL
`Get http://localhost:3001/api/persons/3`.
.Folder name 'request' is implemented to run REST

#### 3.5 POST Create and add new contact using HTTP POST.

.Add new note.
.Auto generated header content-type: with the help of json-parser / app.use(express.json()).
.Retrieve data from body property of the request object.

.Create hard code data object to add new contact person.

#### 3.6 Error handling when creating new contact.

.Validation check to display error message if name or number is missing.
. Prevent double entry.

#### 3.7 Installing morgan logger as a middleware using the function - request, response and next

> `npm install morgan`

After installing morgan configure the middleware by using `app.use` command in the backend index.js file.

- Reference github : `https://github.com/expressjs/morgan`

#### 3.8 Configure Morgan logger to show HTTP POST data log.

![Screenshot 2021-09-27 at 11 25 26 am](https://user-images.githubusercontent.com/67087939/134832408-7e5b1672-f61a-4d11-844f-5200f8a49596.png)

## Exercises 3.9.-3.11. Connect backend to front end

#### 3.9 Connect frontend with backend using Cross-Origin Resource Sharing (CORS) 


In your backend repository, install cors with the command : -

> `npm install cors` 

 * add this line of code in index.js

const cors = require('cors')
app.use(cors())

The front end should work fetching data from the backend.

#### 3.10 Deploy app to backend Heroku

Add node_modules in '.gitignore'
(before deploying)



On root directory

Read heroku documentation for deployment

> `heroku create` > `git push heroku main` > `npm run dev`

- If there is any error display log to view them.

> `heroku logs -t`

## Heroku backend app address link :

`https://young-oasis-08103.herokuapp.com/`

After deploying we can now create a production build or a version of the application which is optimised for production.

This can be don't in the frontend root with the command 'npm run build'.

The process for production build is listed in the frontend repository fullstackopen/part2/phonebook

#### 3.11 is production build which is described in the frontend repository

- fullstackopen/part2/phonebook

#### 3.12 Create a database using the command line.

In this section we will create a MongoDB Atlas cluster that allows access.

> `npm install mongoose`

1. Create a mongoDB database for phone book model, save and created mongo.js.

- Use command line arguments to pass the property to create a new data collection.

example passing 3 parameter on command line : > `node mongo.js yourpassword Anna 040-1234556`

- Use them as command-line arguments

const password = process.argv[2];
const person = new Person({
name: process.argv[3],
number: process.argv[4],
});

-This new entry data will be saved to the database.

If the `phonebook-app` database does not exist the mongoDB will create the database and create a document collection.

const url = `mongodb+srv://fullstack_amutha:${password}@cluster0.eqxje.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

## 3.13 - 3.14 Create, update and fetch all databases from the database mongoDB.

#### 3.13 Write mongoDB models `new mongoose.Schema ` to configure database configuration into its own module.

1. Test the front end fetch all data from backend mongoDB.

#### 3.14 Change the backend so the new contact is added to the database.

#### 3.15 Change the functionality to delete the contact in the database.

#### 3.16 Create an error handler middleware to handle errors for invalid id.

#### 3.17 Change the functionality to change and update existing contacts in the database.

#### 3.18 Change and update the handling of the `api/persons/:id` and `/info`. This should be handled by fetching the information from the database.Verify this works directly in browser, Postman or VS Code REST client.

![Screenshot 2021-10-26 at 2 07 29 pm](https://user-images.githubusercontent.com/67087939/138802291-aa66b5db-2b1d-4c17-960d-15e44160fba9.png)

#### 3.19 Phonebook database validation

- Currently the code validates for double name entries, but to create them directly with Postman or the VS Code REST client.

Mongoose does not offer the build-in validator so double data entry and this can be done by installing mongoose-unique-validator plugin.

> npm install --save mongoose-unique-validator

Documentation link for this installation can be found in :
`https://github.com/blakehaswell/mongoose-unique-validator#readme`

### 3.20 Catch error at frontend to display some form of error message when a validation error occurs. This can be achieved by catching errors.

### 3.21 Deploying the database backend to production

This is a new "full stack" version. Create a new production build of the frontend and copy it to the backend repository. Make sure the application works on local address `http://localhost:30001/`

- Push the new changes to Heroku
  > `git push heroku main`

* Make sure to verify that everything works as it should.

### 3.22 Lint OR linter

Definition in short : Tools for performing static analysis of source code. It detects and flags errors in programming languages, including stylistic error. This will give our code a consistent style code.

In compiled statically typed languages like Java, IDEs like NetBeans can point out errors in the code.

In the JavaScript universe, the current leading tool for static analysis aka. "linting" is ESlint.

1. Install ESlint as a development dependency to the backend project with the command:

> `npm install eslint --save-dev`

2. Now we can initialize a default ESlint configuration with command :

> `node_modules/.bin/eslint --init`

- Answer all the questions.

![Screenshot 2021-11-01 at 11 44 17 am](https://user-images.githubusercontent.com/67087939/139627841-d748cb0a-ce4d-4bf3-96d1-bbcabff9c4bd.png)

- The configuration will be saved in the `.eslintrc.js` file:

a. Change the indentation level to 2 spaces.

3. Inspecting and validating a file like index.js can be done with the following command.

> node_modules/.bin/eslint index.js

4. Recommended to create a separate npm script for linting.

{
// ...
"scripts": {
"start": "node index.js",
"dev": "nodemon index.js",
// ...
"lint": "eslint ."
},
// ...
}

5.  Now the `npm run lint` command will check every file in the project.

- We do not want the build directory to get checked.

6. Create an `.eslintignore` file in the project's root

7. Leave the build folder in the `.eslintignore`.

> `npm run lint`

- It is easier to check for this error using VS Code ESlint plugin. It will underline style violations in the red line.

\*\*\*FIX all errors.

Final outcome screenshot.

Frontend
![Screen Shot 2021-11-02 at 10 10 41 am](https://user-images.githubusercontent.com/67087939/139753872-45c8c202-00fc-4525-b8ff-273bb80e14a3.png)

Backend

![Screen Shot 2021-11-02 at 10 07 28 am](https://user-images.githubusercontent.com/67087939/139753659-f3d6ed25-a05d-440d-aa1d-8699abc6a058.png)

Heroku app

![Screen Shot 2021-11-02 at 4 42 38 pm](https://user-images.githubusercontent.com/67087939/139792628-e60a0281-7cb2-4680-bc47-94f7e78b2660.png)

