const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/user.routes");
const blogRoutes = require("./Routes/blog.routes");
const commentRoute = require("./Routes/comment.routes");
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const db =
  "mongodb+srv://blog:blog@cluster0.rzg2w.mongodb.net/Blog?retryWrites=true&w=majority";
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, result) => {
    if (err) console.log("Database not connected...");
    else console.log("Database connected..");
  }
);

app.use(express.json());
app.use(cookieParser("blogs"));
app.use("/blogs", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs", commentRoute);

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
