# Documentation

- create stripe account
- get secret and public keys
- add keys to .env file

- create client side application with vite
- install necessary packages
- axios,react-stripe-checkout

- import stripe button in app.jsx

```jsx
import StripeCheckout from "react-stripe-checkout";

function App() {
  return (
    <>
      <StripeCheckout />
    </>
  );
}
```

- now some basic work

- for product array get from cart or create a new array or with single element(object) with useState

- this is for payment amount

```jsx
const [product, setProduct] = useState({
  name: "sample pruduct",
  price: 10,
  description: "This is a product discription",
});
```

- now add necessary code in StripePayment button

```jsx
<StripeCheckout
  stripeKey="pk_test_51NRJ7VBhBYaeHe6cSOm8ypnr9Slz7M1sJH07ex9FLDVaKAS6XM8ZZhzOBN3ee1qqOJ8uTL9NMpLFbpmB0E5YEBwR00g8gMSGV5"
  token={handleToken}
  amount={product.price * 100}
  name={product.name}
  billingAddress
  shippingAddress
/>
```

- here for amount we can have cart items. then we need to map through the array and get the amount
- for single product we can just add the product.amount

- for more information we can add product name

- then add billing and shippingAddress props to the button.
- this are two default props. they will get value after finishing the payment

- now we need to create a handleToken function

```jsx
const handleToken = async (token, addresses) => {
  const response = await axios.post("http://localhost:5000/checkout", {
    token,
    product,
  });
  // take response from server
  console.log("response", response.status);
};
```

- in the backend route we will send token and product
- this token is self generated and product is our product from useState.

## Backend

- now create backend

```bash
npm init -y
```

- install necessary packages

```bash
npm i express cors stripe uuid
```

- setup normal express server
- then add this code
  ```js
  const stripe = require("stripe")(" stripe private key");
  ```



- create this route

```js
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
````

- from body we will get token and product
- fill necessary fields with this two items
- amount is product amount
- necessary email and other is from token
- key is generated by uuid

that's it.
when we click the payment button from fontend we will be able to pay
and also can toast message for failed or successful.
