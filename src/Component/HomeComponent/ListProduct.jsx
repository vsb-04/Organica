import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axios from "axios";

export const ListProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9090/product/");
      console.log("Response data:", response.data); // Log response data
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <>
      <section id="products" className="section product">
        <div className="container">
          <p className="section-subtitle"> -- Organic Products --</p>
          <h2 className="h2 section-title">All Organic Products</h2>
          <ul className="grid-list">
            {data.map((item) => (
              <ProductCard
                key={item.productid}
                id={item.productid}
                name={item.productName}
                description={item.description}
                price={item.price}
                img={item.img} // Pass the image data to ProductCard component
                imgFormat={item.imgFormat} // Add imgFormat prop if you have one
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
