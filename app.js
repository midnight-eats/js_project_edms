const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const positionRouter = require("./routes/positionRouter");
const roleRouter = require("./routes/roleRouter");
const categoryRouter = require("./routes/categoryRouter");

app.use(express.static(path.join(__dirname, "js")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Hello, world!"));
app.use("/", indexRouter);
app.use("/positions", positionRouter);
app.use("/roles", roleRouter);
app.use("/categories", categoryRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  
  console.log(`listening on port ${PORT}!`);
});
