const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid").v4;
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51NRJ7VBhBYaeHe6cQlo6YHpD9kcHmVRmDG95n48PFyBpcWKi5BTGLW46twI5pgtHu2qW3mbyxXJAzSMiyoH7xZcw00OGrRzlMI"
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

// root route
app.get("/", (req, res) => {
  res.send("server for payment gateway is working!");
});

//checkout route
app.post("/checkout", (req, res) => {
  console.log("request:", req.body);
});

//server listening
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
