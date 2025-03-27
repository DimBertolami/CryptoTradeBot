# Fetch historical data from yahoo finance, returning a dataframe
import yfinance as yf

def fetch_yfinance_data(symbol='BTC-USD', interval='1h', period="2y"):
    data = yf.download(tickers=symbol, interval=interval, period=period)
    print(data)  # Print the DataFrame to inspect its structure
    import pandas as pd
    data.columns = data.columns.get_level_values(0)
    data = data.reset_index()  # Ensure 'Date' is a normal column
    data = data.rename(columns={'Date': 'timestamp'})
    data.columns = [col.lower() for col in data.columns]
    numeric_cols = ['close', 'high', 'low', 'open', 'volume']
    data['close'] = pd.to_numeric(data['close'], errors='coerce')
    data['close'] = data['close'].astype(float)
    data['timestamp'] = data.index  # Use the index as the timestamp
    return data
