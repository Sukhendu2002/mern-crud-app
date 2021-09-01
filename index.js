const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const User = require("./model/UserSchema");
const { json } = require("express");
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DATABASE;

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/user", (req, res) => {
  User.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/add", (req, res) => {
  const { name, email, phone } = req.body;
  const newUser = new User({
    name,
    email,
    phone,
  });
  newUser.save().then((data) => {
    res.send(data);
    //HTTP status code 201 created
    res.sendStatus(201);
  });
  // User New
});

app.delete("/delete/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/view/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const { name, email, phone } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { name, email, phone },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});
