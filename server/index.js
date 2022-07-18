const express = require('express');
const cors = require('cors');
const app = express();
const  PORT = process.env.PORT || 3002;;

app.use(cors());
app.use(express.json())
const projectRouter = require("./api/v1/routes/project");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Server alive" });
});

app.use("/project", projectRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, ()=>{
    console.log(`Server is running on localhost:${PORT}`)
})