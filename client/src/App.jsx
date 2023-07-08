import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import StripeCheckout from "react-stripe-checkout";
import "./App.css";

function App() {
  // product object for amount
  const [product, setProduct] = useState({
    name: "sample T-shirt",
    price: 120,
    description: "This is a product discription for sample T-shirt",
  });

  // handle token
  const handleToken = async (token, addresses) => {
    const response = await axios.post("http://localhost:5000/checkout", {
      token,
      product,
    });
    // take response from server
    console.log("response", response.status);
    if (response.status === 200) {
      toast.success("payment successfull");
    } else {
      toast.error("payment failed");
    }
  };
  return (
    <>
      <Toaster />
      <div className=" main-box container d-flex justify-content-center h-100 text-center align-items-center">
        <div className="row ">
          <div className="col-md-12 my-5">
            <h1 className="text-uppercase">stripe payment</h1>
          </div>
          <div className="col-md-12 text-center mb-5">
            <h3>product name: {product.name}</h3>
            <h3>product price: {product.price}</h3>
            <h3>product description: {product.description}</h3>
          </div>
          <div className="col-md-12">
            <StripeCheckout
              stripeKey="pk_test_51NRJ7VBhBYaeHe6cSOm8ypnr9Slz7M1sJH07ex9FLDVaKAS6XM8ZZhzOBN3ee1qqOJ8uTL9NMpLFbpmB0E5YEBwR00g8gMSGV5"
              token={handleToken}
              amount={product.price * 100}
              name={product.name}
              billingAddress
              shippingAddress
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
