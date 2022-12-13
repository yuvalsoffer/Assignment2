import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Catalog from "./Pages/Catalog/Catalog";
import Cart from "./Pages/Cart/Cart";
import { useEffect, useState } from "react";

function App() {
  const [catalogProducts, setCatalogProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setCatalogProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [cartProducts, setCartProducts] = useState([]);
  function onAdd(newProduct) {
    let newCartProducts = [...cartProducts];
    let exsitingProduct = newCartProducts.find(
      (product) => product.name === newProduct.name
    );
    if (exsitingProduct) {
      exsitingProduct.quantity++;
    } else {
      newCartProducts.push({ ...newProduct, quantity: 1 });
    }
    setCartProducts(newCartProducts);
    console.log(newCartProducts);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Outlet />
            </div>
          }
        >
          <Route
            index
            element={<Catalog products={catalogProducts} onAdd={onAdd} />}
          />
          <Route path="cart" element={<Cart products={cartProducts} />} />
          <Route path="*" element={<div>wrong</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
