import React, { useState } from 'react';

const CoinList = ({ coins }) => {
  const [blacklistedCoins, setBlacklistedCoins] = useState([]);

  const flagCoinAsFake = (coinId) => {
    setBlacklistedCoins((prev) => [...prev, coinId]);
  };

  const viewCoinDetails = (coinId) => {
    // Placeholder function for viewing coin details
    console.log(`Viewing details for coin ID: ${coinId}`);
  };

  return (
    <div>
      <h2>Detected Coins</h2>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Risk Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr key={coin.id}>
              <td>{coin.name} ({coin.symbol})</td>
              <td>${coin.price}</td>
              <td>${coin.marketCap}</td>
              <td>{coin.riskScore}</td>
              <td>
                <button onClick={() => flagCoinAsFake(coin.id)}>Flag as Fake</button>
                <button onClick={() => viewCoinDetails(coin.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
