import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AboutUs from "./components/AboutUs";
import "./App.css";

const App = () => {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div>
      {!showProductList ? (
        <div className="background-image">
          <div className="overlay-content">
            <h1>Welcome to Paradise Nursery</h1>

            <button onClick={() => setShowProductList(true)}>
              Get Started
            </button>

            <AboutUs />
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
};

export default App;