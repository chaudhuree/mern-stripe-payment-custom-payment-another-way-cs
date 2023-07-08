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
app.post("/checkout", async (req, res) => {
  // console.log("request:", req.body);
  let error, status;
  try {
    const { product, token } = req.body;
    // console.log("product:", product);
    // console.log("price:", product.price);
    // console.log("token:", token);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    // console.log("customer:", customer);
    const key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `purchase of ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      { idempotencyKey: key }
    );
    console.log("charge:", charge);
    status = "success";
  } catch (error) {
    console.log("error:", error);
    status = "failure";
  }
  res.json({ error, status });
});

//server listening
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
