import React, { useEffect, useState } from 'react';

const YahooFinanceData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/yahoofinance/candles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log(result); // Log the API response
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Yahoo Finance Historical Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.time}</td>
                            <td>{item.open}</td>
                            <td>{item.close}</td>
                            <td>{item.high}</td>
                            <td>{item.low}</td>
                            <td>{item.vol}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default YahooFinanceData;
