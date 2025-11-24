import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/categories");
                setCategories(res.data.data || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleClick = (cat) => {
        navigate(`/category/${cat.id}`);
    };

    return (
        <>
            <HeaderCopy />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Discover our category</h2>

                <div className="grid grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-[#eef9ff] p-3 rounded-2xl flex flex-col items-center shadow-sm cursor-pointer transition hover:scale-105"
                            onClick={() => handleClick(cat)}
                        >
                            <img
                                src={
                                    cat.image
                                        ? `${process.env.REACT_APP_API_URL}/storage/${cat.image}`
                                        : "/placeholder.jpg"
                                }
                                alt={cat.name}
                                className="w-20 h-20 object-contain"
                            />
                            <p className="text-center text-sm font-medium mt-2">
                                {cat.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Categories;
