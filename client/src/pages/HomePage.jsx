import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { recommendationId } = useParams();
    const [recommendation, setRecommendation] = useState([]);
    const navigate = useNavigate();

    const getRecommendation = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/recommendations/${recommendationId}`);
            setRecommendation(response.data.recommendations);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getRecommendation();
    }, [recommendationId]);

    const logOut = async () => {
        try {
            await axios.post('http://localhost:5000/users/logout');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="p-6 font-roboto bg-green-50 min-h-screen">
            <div className='flex'>
                <h1 className="text-3xl font-bold mb-6 text-green-800 underline">Your Nutritional Recommendations</h1>
                <button
                    onClick={() => logOut()}
                    className="absolute mb-3 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 right-20 top-10"
                >
                    Log Out
                </button>
            </div>
            {
                recommendation.map((plan, index) => (
                    <div key={index} className="mb-8 p-6 bg-white border border-green-200 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-green-700">Nutrient: {plan.nutrient}</h2>
                        <div className="mb-4">
                            <strong className="text-green-600">Recommended Foods:</strong>
                            <ul className="list-disc ml-5 text-green-800">
                                {plan.recommended_foods.map((food, i) => (
                                    <li key={i}>{food}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4 flex flex-wrap gap-4">
                            {plan.images.map((image, i) => (
                                <img
                                    key={i}
                                    src={image}
                                    alt={`Image ${i}`}
                                    className="w-32 h-32 object-cover rounded-lg shadow-md border border-green-300"
                                />
                            ))}
                        </div>
                        <div className="mb-4">
                            <strong className="text-red-600">Avoid Foods:</strong>
                            <ul className="list-disc ml-5 text-green-800">
                                {plan.avoid_foods.length ? (
                                    plan.avoid_foods.map((food, i) => (
                                        <li key={i}>{food}</li>
                                    ))
                                ) : (
                                    <li className="italic text-gray-500">Nothing in specific</li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default HomePage;