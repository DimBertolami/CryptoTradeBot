import React, { useState, useEffect } from "react";

const FetchData = ({ onFetchSuccess, onFetchError }) => {
    const [data, setData] = useState(null); // State to hold fetched data
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    const fetchData = async () => {
        try {
            const binanceResponse = await fetch("/api/binance");
            const bitvavoResponse = await fetch("/api/bitvavo");
            const yahooResponse = await fetch("/api/yahoo");

            const binanceData = await binanceResponse.json();
            const bitvavoData = await bitvavoResponse.json();
            const yahooData = await yahooResponse.json();

            setData({ binance: binanceData, bitvavo: bitvavoData, yahoo: yahooData });
            if (onFetchSuccess) onFetchSuccess();
        } catch (error) {
            if (onFetchError) onFetchError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Fetched Data</h2>
            {data && (
                <div>
                    <h3>Binance Data</h3>
                    <pre>{JSON.stringify(data.binance, null, 2)}</pre>
                    <h3>Bitvavo Data</h3>
                    <pre>{JSON.stringify(data.bitvavo, null, 2)}</pre>
                    <h3>Yahoo Finance Data</h3>
                    <pre>{JSON.stringify(data.yahoo, null, 2)}</pre>
                </div>
            )}
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>

            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default FetchData;
