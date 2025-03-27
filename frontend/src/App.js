import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null); // State to hold any fetch errors

  useEffect(() => {
    const fetchData = async () => {
      let binanceResponse, bitvavoResponse, yahooResponse; // Declare response variables
      try {
        // Fetch data from Binance, Bitvavo, and Yahoo Finance
        binanceResponse = await fetch('https://api.binance.com/api/v3/ticker/price');
        bitvavoResponse = await fetch('https://api.allorigins.win/get?url=https://api.bitvavo.com/v2/tickers'); // Using a different CORS proxy
        yahooResponse = await fetch('https://api.allorigins.win/get?url=https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD'); // Using a different CORS proxy

        if (!binanceResponse.ok) {
          throw new Error('Failed to fetch data from Binance');
        }
        if (!bitvavoResponse.ok) {
          throw new Error('Failed to fetch data from Bitvavo');
        }
        if (!yahooResponse.ok) {
          throw new Error('Failed to fetch data from Yahoo Finance');
        }

        const binanceData = await binanceResponse.json();
        const bitvavoData = await bitvavoResponse.json();
        const yahooData = await yahooResponse.json();

        setCryptoData([binanceData, bitvavoData, yahooData]);
        console.log('Data fetched successfully'); // Log success
      } catch (error) {
        setError(error.message); // Set error message in state
        console.error('Error fetching data:', error); // Log error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <video autoPlay loop muted className="App-video">
          <source src="/alexhonnold.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <h1>Welcome to Dim's Crypto Samurai Portal!</h1>
        {error && <p className="error">Error: {error}</p>} {/* Display error message if any */}
        {cryptoData.length === 0 && <p>No data available.</p>} {/* Display message if no data is fetched */}
        <div>
          {cryptoData.length > 0 && cryptoData.map((data, index) => (
            <div key={index}>
              <h2>Data from {index === 0 ? 'Binance' : index === 1 ? 'Bitvavo' : 'Yahoo Finance'}</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
