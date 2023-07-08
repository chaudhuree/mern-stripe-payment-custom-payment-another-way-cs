import { Toaster } from "react-hot-toast";
import StripeCheckout from "react-stripe-checkout";
import "./App.css";

function App() {
  return (
    <>
      <Toaster />
      <div className=" main-box container d-flex justify-content-center h-100 text-center align-items-center">
        <div className="row ">
          <div className="col-md-12 my-5">
            <h1>stripe payment</h1>
          </div>
          <div className="col-md-12">
            <StripeCheckout />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
