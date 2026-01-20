import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import api from "../../../api";

const BestSellers = () => {
  const [product_info, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get("/top-delivered-items");
        if (res.data.status) {
          setProductInfo(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading products...
      </div>
    );

  return (
    <div className="w-full pb-20 pt-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10 ">

        {product_info.map((item) => (    
          <Product
            key={item.id}
            _id={item.id}
            img={`${process.env.REACT_APP_API_URL}/public/${item.image}`}
            productName={item.name}
            price={item.price || "N/A"}
            color="Default"
            badge={true}
            badge_text = "Best"
            des="Top selling product"
          />
        ))}

      </div>
    </div>
  );
};

export default BestSellers;
