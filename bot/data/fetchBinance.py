import os
# fetch historical data from Binance, returns a dataframe
def fetch_binance_candlestick_data(symbol='BTCUSDT', interval='1h', lookback='730 days ago UTC'):
    return fetch_binance_data(symbol=symbol, interval=interval, lookback=lookback)
from binance.client import Client  # Import BinanceClient

import logging  # Import logging module

# Set up logging
logging.basicConfig(level=logging.INFO)

def fetch_binance_data(symbol='BTCUSDT', interval='1h', lookback='730 days ago UTC'):
    try:
        logging.info(f"Fetching data for symbol: {symbol}, interval: {interval}, lookback: {lookback}")
        binance_client = Client(BINANCE_API_KEY=os.getenv("BINANCE_API_KEY"), BINANCE_API_SECRET=os.getenv("BINANCE_API_SECRET"))  # Initialize BinanceClient
        klines = binance_client.get_historical_klines(symbol, Client.KLINE_INTERVAL_1DAY, lookback)
        data = pd.DataFrame(klines, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume', 'taker_buy_base_asset_volume', 'taker_buy_quote_asset_volume', 'SMA', 'EMA', 'RSI', 'target'])
        logging.info("Data fetched successfully.")
        data['close'] = pd.to_numeric(data['close'], errors='coerce')
        data['close'] = data['close'].astype(float)
        data['timestamp'] = pd.to_datetime(data['timestamp'], unit='ms')
        return data
    except Exception as e:
        logging.error(f"Error fetching data: {e}")
        return pd.DataFrame()  # Return an empty DataFrame on error
