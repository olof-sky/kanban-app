require('dotenv').config()
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const projectRouter = require("./api/v1/project/project.controller");
const userRouter = require("./api/v1/user/user.controller");
const authRouter = require('./middleware/auth');
const secureRouter = require('./middleware/secure');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(errorHandler);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/user", userRouter);
app.use('/api/auth', authRouter); 
app.use('/', secureRouter); 
app.use(cors());
app.use(express.json({
  type: 'application/json',
}))
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.get("/", (req, res) => {
//   res.json({ message: "Server alive" });
// });

app.listen(PORT, ()=>{
    console.log(`Server is running on localhost:${PORT}`)
});