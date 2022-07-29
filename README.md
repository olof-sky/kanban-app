# Kanban web application

## :gear: Server

Run npm install in the server directory, you can then run:
#### `node index.js`

Runs the server on [http://localhost:3002](http://localhost:3002)

#### :open_book: About
Server running on node.js / express. Handles APIs, middleware and security. The application is using MySQL db together with sequelizer in node to implement mapping and access to db objects. API calls are made from the client side React application and objects are returned as json. API structure built using controller, model and service. Calls are made to controller which uses the corresponding service to get items from sequelized instance of the MySQL db. Db is initialized in helpers/db.

#### :lock: Security
##### JWT Tokens

The server security is based on refresh tokens/access tokens, where the access token has a lifetime of 15 minutes and gets refreshed by the refresh token on login and api actions. Tokens are stored in session storage on client side. The refreshtoken is also stored in the user object in MySQL db. User IDs are stored inside the tokens. To validate the refresh token, server checks if session storage token and the user token are equal, then return the user object associated with that token. This is to prevent old refresh tokens of being used several times. Refresh tokens are rotated on refresh.

Client side script is run every 15 minutes in App to check whether access token is still valid or not.
Refreshtokens get deleted from user object in db on logout and sessionstorage is cleaned.

#### :package: APIs
##### Create
- Project
  - [x] /api/v1/project/create
- Task
  - [ ] /api/v1/task/create
- User
  - [x] /api/v1/user/create
- Group
  - [ ] /api/v1/group/create
  
##### Read
- Project
  - [x] /api/v1/project/getMultiple
  - [x] /api/v1/project/getById/:id
- Task
  - [ ] /api/v1/task/getMultiple
  - [ ] /api/v1/task/getById/:id
- User
  - [x] /api/v1/user/getMultiple
  - [x] /api/v1/user/getLoggedInUser
  - [x] /api/v1/user/getById/:id
  - [x] /api/v1/user/getByFirstName
  - [x] /api/v1/user/getByLastName
  - [x] /api/v1/user/getByEmail
- Group
  - [ ] /api/v1/group/getMultiple
  - [ ] /api/v1/group/getById:id
  
##### Update
- Project
  - [x] /api/v1/project/updateProjectName/:id
  - [x] /api/v1/project/updateProjectType/:id
- Task
  - [ ] /api/v1/project/updateTaskName/:id
  - [ ] /api/v1/project/updateTaskStatus/:id
- User
  - [x] /api/v1/user/updateUserFirstName
  - [x] /api/v1/user/updateUserLastName
- Group
  - [ ] /api/v1/group/...
  
##### Delete
- Project
  - [x] /api/v1/project/deleteProject/:id
- Task
  - [ ] /api/v1/task/deleteTask/:id
- User
  - [x] /api/v1/user/deleteUser/:id
- Group
  - [ ] /api/v1/group/deleteGroup/:id
  
 ##### Auth
 - New refresh token
   - [x] /api/auth/refreshToken
 - Validate access token 
   - [x] /api/auth/secure
 - Login/logout
   - [x] /api/auth/login
   - [x] /api/auth/logout
  
#### :pushpin: ToDo
  - [ ] Update APIs
  - [x] Delete APIs
  - [ ] Project tasks
  - [x] Users
  - [ ] Groups
  - [ ] Roles
  - [x] Security
  - [ ] Db mapping

## :page_facing_up: Frontend
Run npm install in the frontend directory, you can then run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
