import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import api from "../../../api";
import { toast } from "react-toastify";

const SpecialOffers = () => {
  const [product_info, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const res = await api.get("/products/special-offers");
        const items = res.data.data || [];
        if(res.data.status){
          setProductInfo(items.slice(-4));
        }
      } catch (error) {
        toast.error("Error fetching products...");
      }
      finally{
        setLoading(false);
      }
    };
    fetchProduct();
  },[]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading products...
      </div>
    );

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {product_info.map((item)=>(
          <Product
          key = {item.id} 
          _id={item.id}
          img={`${process.env.REACT_APP_API_URL}/public/${item.image}`}
          productName={item.name}
          price={item.price}
          color="Default"
          badge={true}
          badge_text = "Offer"
          des={item.description}
          />
        ))}
        
        
      </div>
    </div>
  );
};

export default SpecialOffers;
