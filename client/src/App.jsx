import { Toaster } from "react-hot-toast";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  return (
    <>
      <Toaster />
      <h1>stripe payment</h1>
      <StripeCheckout/>
    </>
  );
}

export default App;
