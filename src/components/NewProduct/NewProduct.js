import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import ProductForm from "./ProductForm";

const NewProduct = (props) => {
  const { isLoading, error, sendHttpRequest: sendProduct } = useHttp();

  const createProduct = (productText, productsData) => {
    const generatedId = productsData.name;
    const createdProduct = { id: generatedId, text: productText };

    props.onAddProduct(createdProduct);
  };

  const enterProductHandler = async (productText) => {
    sendProduct(
      {
        endpoint:
          "https://react-jokes-3409a-default-rtdb.firebaseio.com/products.json",
        method: "POST",
        body: { text: productText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createProduct.bind(null, productText)
    );
  };
  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewProduct;
