import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                username,
                password,
            }, { withCredentials: true });

            const recommendationId = response.data.recommendationId;

            if (recommendationId) {
                navigate(`/home/${recommendationId}`);
            } else {
                toast.error('Invalid username or password');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
            <div className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg shadow-lg border border-green-200">
                <h1 className="text-2xl font-bold text-green-800">Please Log In</h1>
                <form className="flex flex-col space-y-4" onSubmit={onSubmitForm}>
                    <input
                        className="border border-green-300 p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        className="border border-green-300 p-3 w-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                        className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
                        type="submit"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LandingPage