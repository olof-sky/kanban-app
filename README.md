# Kanban web application

## :gear: Server

Run npm install in the server directory, you can then run:
#### `node index.js`

Runs the server on [http://localhost:3002](http://localhost:3002)

Current APIs listed below

##### Create
- Project
  - [x] /api/v1/project/create
- Task
  - [ ] /api/v1/task/create
- User
  - [ ] /api/v1/user/create
- Group
  - [ ] /api/v1/group/create

##### Read
- Project
  - [x] /api/v1/project/getMultiple
  - [x] /api/v1/project/getFromId/:id
- Task
  - [ ] /api/v1/task/getMultiple
  - [ ] /api/v1/task/getFromId/:id
- User
  - [ ] /api/v1/user/getMultiple
  - [ ] /api/v1/user/getFromId:id
  - [ ] /api/v1/user/getFromName:
- Group
  - [ ] /api/v1/group/getMultiple
  - [ ] /api/v1/group/getFromId:id

##### Update
- Project
  - [ ] /api/v1/project/updateProjectName/:id.
  - [ ] /api/v1/project/updateProjectType/:id.
- Task
  - [ ] /api/v1/project/updateTaskName/:id.
  - [ ] /api/v1/project/updateTaskStatus/:id.
- User
  - [ ] /api/v1/user/...
- Group
  - [ ] /api/v1/group/...

##### Delete
- Project
  - [ ] /api/v1/project/delete/:id
- Task
  - [ ] /api/v1/task/delete/:id
- User
  - [ ] /api/v1/user/delete/:id
- Group
  - [ ] /api/v1/group/delete/:id

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
