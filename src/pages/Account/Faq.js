import React, { useEffect, useState } from 'react';
import api from '../../api';

const Faq = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const res = await api.get('/faq');
                if (res.data.status) {
                    setFaq(res.data.data);
                }
            } catch (error) {
                console.log('Faq fetching error..', error);
            }
        };

        fetchFaq();
    }, []);

    return (
        <div className="max-w-3xl p-4">
            <h1 className="text-2xl font-bold mb-4">FAQ</h1>

            <ul className="flex flex-col gap-4">
                {faq.map((item) => (
                    <li
                        key={item.id}
                        className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
                    >
                        <h2 className="font-semibold text-lg mb-1">Q: {item.question}</h2>
                        <p className="text-gray-700 leading-relaxed"><b>A: </b>{item.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Faq;
