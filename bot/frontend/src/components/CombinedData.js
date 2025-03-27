import React, { useEffect, useState } from 'react';

const CombinedData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/price-data/combined');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log(result); // Log the API response for debugging
                if (!result || result.length === 0) {
                    throw new Error('No data received from the API');
                }
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
            <h2>Combined Data from Binance and Bitvavo</h2>
            <table>
                <thead>
                    <tr>
                        <th>Source</th>
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
                            <td>{item.source}</td>
                            <td>{item.time}</td>
                            <td>{item.open}</td>
                            <td>{item.close}</td>
                            <td>{item.high}</td>
                            <td>{item.low}</td>
                            <td>{item.vol}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CombinedData;
