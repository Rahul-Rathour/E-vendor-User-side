import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const SearchBox = ({ mobile = false }) => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [listening, setListening] = useState(false);

    const debounceRef = useRef();
    const recognitionRef = useRef();
    const abortControllerRef = useRef();

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);

            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);
    const performSearch = async (query) => {
        if (!query.trim()) {
            setFilteredProducts([]);
            setLoading(false);
            return;
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setLoading(true);

        try {
            const res = await api.get("/products/search", {
                params: {
                    q: query
                },
                signal: abortControllerRef.current.signal
            });

            if (res.data.status) {
                setFilteredProducts(res.data.data);
            } else {
                setFilteredProducts([]);
            }
        } catch (err) {
            if (
                err.name !== "AbortError" &&
                err.name !== "CanceledError"
            ) {
                console.log(err);
            }

            setFilteredProducts([]);
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;

        setSearchQuery(value);

        if (!value.trim()) {
            setFilteredProducts([]);
            setShowResults(false);
            return;
        }

        setShowResults(true);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            performSearch(value);
        }, 400);
    };

    const startVoiceSearch = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Voice Search is not supported.");
            return;
        }

        recognitionRef.current = new SpeechRecognition();

        recognitionRef.current.lang = "en-US";
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onstart = () => {
            setListening(true);
        };

        recognitionRef.current.onend = () => {
            setListening(false);
        };

        recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;

            setSearchQuery(transcript);

            performSearch(transcript);

            setShowResults(true);
        };

        recognitionRef.current.start();
    };

    const openProduct = (product) => {
        setShowResults(false);
        setSearchQuery("");

        navigate(`/product/${product.id}`, {
            state: {
                product
            }
        });
    };

    return (
        <>
            {listening && (
                <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
                    <div className="bg-white rounded-xl px-8 py-6 shadow-xl">
                        <h2 className="text-xl font-semibold">
                            🎤 Listening...
                        </h2>
                    </div>
                </div>
            )}

            <div className="relative w-full">

                <div
                    className={`flex items-center ${mobile
                            ? "bg-white border rounded-lg"
                            : "bg-[#111111] border border-[#3A3A3A] rounded-md"
                        }`}
                >
                    <FaSearch
                        className={`ml-4 ${mobile ? "text-gray-500" : "text-gray-400"
                            }`}
                    />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleChange}
                        onFocus={() => {
                            if (filteredProducts.length > 0) {
                                setShowResults(true);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && searchQuery.trim()) {
                                navigate(
                                    `/search?q=${encodeURIComponent(searchQuery.trim())}`
                                );
                                setShowResults(false);
                            }
                        }}
                        placeholder="Search for products..."
                        className={`flex-1 px-4 py-3 outline-none ${mobile
                                ? "bg-white text-black placeholder:text-gray-500"
                                : "bg-transparent text-white placeholder:text-gray-400"
                            }`}
                    />

                    <button
                        onClick={startVoiceSearch}
                        className={`px-3 ${mobile
                                ? "text-gray-500 hover:text-black"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <FiMic size={20} />
                    </button>

                    <button
                        onClick={() => {
                            if (searchQuery.trim()) {
                                navigate(
                                    `/search?q=${encodeURIComponent(searchQuery.trim())}`
                                );
                                setShowResults(false);
                            }
                        }}
                        className={`px-6 py-3 font-medium transition ${mobile
                                ? "bg-black text-white rounded-r-lg hover:bg-gray-800"
                                : "bg-[#D4AF37] text-black rounded-r-md hover:bg-[#c79d17]"
                            }`}
                    >
                        Search
                    </button>

                </div>
                {showResults && (
                    <div
                        className={`absolute left-0 right-0 mt-2 rounded-lg shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto ${mobile
                                ? "bg-white border"
                                : "bg-[#111111] border border-[#333]"
                            }`}
                    >
                        {loading && (
                            <div
                                className={`p-4 text-center ${mobile ? "text-gray-500" : "text-gray-300"
                                    }`}
                            >
                                Searching...
                            </div>
                        )}
                        {!loading &&
                            filteredProducts.length === 0 &&
                            searchQuery.trim() !== "" && (
                                <div
                                    className={`p-4 text-center ${mobile ? "text-gray-500" : "text-gray-400"
                                        }`}
                                >
                                    No Products Found
                                </div>
                            )}

                        {!loading &&
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => openProduct(product)}
                                    className={`flex items-center gap-4 p-3 cursor-pointer transition ${mobile
                                            ? "hover:bg-gray-100 border-b"
                                            : "hover:bg-[#1c1c1c] border-b border-[#2d2d2d]"
                                        }`}
                                >
                                    <img
                                        src={
                                            product.image
                                                ? `${process.env.REACT_APP_API_URL}/public/${product.image}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />

                                    <div className="flex-1">

                                        <h4
                                            className={`font-medium ${mobile
                                                    ? "text-gray-900"
                                                    : "text-white"
                                                }`}
                                        >
                                            {product.name}
                                        </h4>

                                        <p
                                            className={`text-sm ${mobile
                                                    ? "text-gray-500"
                                                    : "text-gray-400"
                                                }`}
                                        >
                                            ₹{product.price}
                                        </p>

                                    </div>

                                </div>
                            ))}

                    </div>
                )}

            </div>
        </>
    );
};

export default SearchBox;