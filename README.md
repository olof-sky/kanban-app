# Kanban web application

## :gear: Server

Run npm install in the server directory, you can then run:
#### `node index.js`

Runs the server on [http://localhost:3002](http://localhost:3002)

Current APIs listed below

##### Create
- Project
  - [x] /api/project/create
- Task
  - [ ] /api/task/create
- User
  - [ ] /api/user/create
- Group
  - [ ] /api/group/create

##### Read
- Project
  - [x] /api/project/getAll
  - [ ] /api/project/getFromId/:id
- Task
  - [ ] /api/task/getAll
  - [ ] /api/task/getFromId/:id
- User
  - [ ] /api/user/getAll
  - [ ] /api/user/getFromId:id
  - [ ] /api/user/getFromName:
- Group
  - [ ] /api/group/getAll
  - [ ] /api/group/getFromId:id

##### Update
- Project
  - [ ] /api/project/updateProjectName/:id.
  - [ ] /api/project/updateProjectType/:id.
- Task
  - [ ] /api/project/updateTaskName/:id.
  - [ ] /api/project/updateTaskStatus/:id.
- User
  - [ ] /api/user/...
- Group
  - [ ] /api/group/...

##### Delete
- Project
  - [ ] /api/project/delete/:id
- Task
  - [ ] /api/task/delete/:id
- User
  - [ ] /api/user/delete/:id
- Group
  - [ ] /api/group/delete/:id

#### :pushpin: ToDo
- Add following
  - [ ] Update APIs
  - [ ] Delete APIs
  - [ ] Project tasks
  - [ ] Users
  - [ ] Groups
  - [ ] Roles
  - [ ] Security
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
