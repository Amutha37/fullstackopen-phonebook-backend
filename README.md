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


### Exercises 3.9.-3.11. CONNECT TO THE BACKEND

6. npm install cors
7. .Edit backend insert 
8. 
   `const cors = require('cors'`
   `app.use(cors())` 

7. Add node_modules .gitignore with the following contents
(front end should work)

# 3.10 Deploy app to backend Heroku

i) On root directory

> heroku create
> git push heroku main
> npm run dev (view the new app)

. Check the log if there is any error.
>  heroku logs -t

### Create production build 

> npm run build 
* copy the build to back end root repo
* 

### Link to heroku app backend
 Full stack open part 3
 
https://quiet-dawn-80146.herokuapp.com/

![Screen Shot 2021-09-30 at 2 43 38 pm](https://user-images.githubusercontent.com/67087939/135388754-a2832d41-c003-4687-b260-b61473c78ea5.png)


### Express backend 

"http://localhost:3001"

![Screen Shot 2021-09-30 at 2 44 45 pm](https://user-images.githubusercontent.com/67087939/135388835-b97856de-923c-4c64-8e16-0d0535518e8a.png)

### Local frontend network status

http://localhost:3000


![Screen Shot 2021-09-30 at 2 46 33 pm](https://user-images.githubusercontent.com/67087939/135388983-b18e4d25-e3f8-4230-9d9e-01e255472874.png)

Data out put 

![Screen Shot 2021-09-30 at 2 46 57 pm](https://user-images.githubusercontent.com/67087939/135389011-c3f36583-263c-40ab-a855-dcab79a254e9.png)

