import pandas as pd

def prepare_bitvavo_data(df):
    # Example processing: Add a new feature, normalize data, etc.
    # Here we can add any feature engineering or data processing needed for analysis
    df['price_change'] = df['close'].diff()  # Example feature: price change
    df.dropna(inplace=True)  # Remove rows with NaN values
    return df
