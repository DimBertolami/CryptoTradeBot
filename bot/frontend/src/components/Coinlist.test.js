import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CoinList from './Coinlist';

describe('CoinList Component', () => {
  const mockCoins = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 50000, marketCap: 900000000, riskScore: 5 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 4000, marketCap: 500000000, riskScore: 4 },
  ];

  test('renders CoinList with coins', () => {
    const { getByText } = render(<CoinList coins={mockCoins} />);
    expect(getByText('Detected Coins')).toBeInTheDocument();
    expect(getByText('Bitcoin (BTC)')).toBeInTheDocument();
    expect(getByText('Ethereum (ETH)')).toBeInTheDocument();
  });

  test('flags a coin as fake', () => {
    const { getByText } = render(<CoinList coins={mockCoins} />);
    const flagButton = getByText('Flag as Fake');
    fireEvent.click(flagButton);
    expect(getByText('Blacklisted')).toBeInTheDocument();
  });
});
