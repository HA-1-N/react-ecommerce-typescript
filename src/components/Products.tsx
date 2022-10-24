import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

var token: any;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort, open }: any) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const productData = res?.data;
        setProducts(productData);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat, open]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products?.filter((item: any) => {
          return Object.entries(filters).every(([key, value]) =>
            item[key]?.includes(value)
          );
        })
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev: any) =>
        [...prev]?.sort((a: any, b: any) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev: any) =>
        [...prev]?.sort((a: any, b: any) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev: any) =>
        [...prev]?.sort((a: any, b: any) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Container>
        {cat
          ? filteredProducts.map((item: any, index: number) => (
              <Product item={item} key={index} />
            ))
          : products
              ?.slice(0, 8)
              ?.map((item: any, index: number) => (
                <Product item={item} key={index} />
              ))}
      </Container>
    </>
  );
};

export default Products;
