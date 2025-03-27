def train_LSTM(X_train, y_train, lookback=730, units=50, epochs=100):
    timesteps=400           # dimensionality of the input sequence
    features=3            # dimensionality of each input representation in the sequence
    LSTMoutputDimension = 2 # dimensionality of the LSTM outputs (Hidden & Cell states)
    input = Input(shape=(timesteps, features))
    output= LSTM(LSTMoutputDimension)(input)
    model_LSTM = Model(inputs=input, outputs=output)
    W = model_LSTM.layers[1].get_weights()[0]
    U = model_LSTM.layers[1].get_weights()[1]
    b = model_LSTM.layers[1].get_weights()[2]
    print("Shapes of Matrices and Vecors:")
    print("Input [batch_size, timesteps, feature] ", input.shape)
    print("Input feature/dimension (x in formulations)", input.shape[2])
    print("Number of Hidden States/LSTM units (cells)/dimensionality of the output space (h in formulations)", LSTMoutputDimension)
    print("W", W.shape)
    print("U", U.shape)
    print("b", b.shape)
    model_LSTM.summary()
    model = Sequential([
        LSTM(units, return_sequences=True, input_shape=(X_train.shape[1], 1)),
        LSTM(units),
        Dense(1, activation='sigmoid')
    ])
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    model.fit(X_train, y_train, epochs=epochs, batch_size=32, verbose=1)
    return model

# Train CNN
def train_CNN(X_train, y_train, filters=64, kernel_size=2, epochs=100):
    model = Sequential([
        Conv1D(filters, kernel_size, activation='relu', input_shape=(X_train.shape[1], 1)),
        Flatten(),
        Dense(1, activation='sigmoid')
    ])
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    model.fit(X_train, y_train, epochs=epochs, batch_size=32, verbose=1)
    return model

