import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const res = await api.get(`/products/search`, { params: { q: query.trim() } });
        if (res.data.status) {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Search results error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg mt-10 shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Search Results for <span className="text-primeColor">“{query}”</span>
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
              className="border rounded-lg p-3 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
            >
              <img
                src={
                  item.image
                    ? `${process.env.REACT_APP_API_URL}/storage/${item.image}`
                    : "/placeholder.jpg"
                }
                alt={item.name}
                className="w-full h-52 object-cover rounded-md mb-3"
              />
              <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.category_name}</p>
              <p className="text-primeColor font-semibold mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
