import React, { useEffect, useState, useCallback } from "react";

import Products from "./components/Products/Products";
import NewProduct from "./components/NewProduct/NewProduct";
import useHttp from "./hooks/use-http";

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // const fetchProducts = async (productText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       "https://react-jokes-3409a-default-rtdb.firebaseio.com/products.json"
  //     );

  //     if (!response.ok) {
  //       throw new Error("Ошибка запроса.");
  //     }

  //     const data = await response.json();

  //     const loadedProducts = [];

  //     for (const productKey in data) {
  //       loadedProducts.push({ id: productKey, text: data[productKey].text });
  //     }

  //     setProducts(loadedProducts);
  //   } catch (err) {
  //     setError(err.message || "Что-то пошло не так...");
  //   }
  //   setIsLoading(false);
  // };
  const { isLoading, error, sendHttpRequest: fetchProducts } = useHttp();

  useEffect(() => {
    const manageProducts = (productsData) => {
      const loadedProducts = [];

      for (const productKey in productsData) {
        loadedProducts.push({
          id: productKey,
          text: productsData[productKey].text,
        });
      }

      setProducts(loadedProducts);
    };
    fetchProducts(
      {
        endpoint: `https://react-jokes-3409a-default-rtdb.firebaseio.com/products.json`,
      },
      manageProducts
    );
  }, [fetchProducts]);

  const productAddHandler = (product) => {
    setProducts((prevProducts) => prevProducts.concat(product));
  };

  return (
    <React.Fragment>
      <NewProduct onAddProduct={productAddHandler} />
      <Products
        items={products}
        loading={isLoading}
        error={error}
        onFetch={fetchProducts}
      />
    </React.Fragment>
  );
}

export default App;
