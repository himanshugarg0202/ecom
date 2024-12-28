import React from "react";
import "./App.css";
import Products from "./components/products/Products";

const  App = () => {
  return (
    <div className="App">
      <h1>Product List</h1>
      <Products />
    </div>
  );
}

export default App;
