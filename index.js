const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const morgan = require("morgan");
app.use(morgan("dev"));

const helmet = require("helmet");
app.use(helmet());

const compression = require("compression");
app.use(compression());

const apiRouter = require("./src/server/api");
app.use("/api", apiRouter);

// error-handler midlleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log(err);
  res.status(status).json({
    error: err.message || `An unknown error occurred. Please try again!`,
  });
});

mongoose
  .connect(
    process.env.URL
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "mongoose connected"
      );
      console.log(`Server is up on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res) => {
  res.send(`server connected succuse`)
})
