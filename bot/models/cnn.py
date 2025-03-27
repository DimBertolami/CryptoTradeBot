# Train CNN
def train_CNN(X_train, y_train, filters=64, kernel_size=2, epochs=100):
    model = Sequential([
        Conv1D(filters, kernel_size, activation='relu', input_shape=(X_train.shape[1], 1)), Flatten(), Dense(1, activation='sigmoid')])
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    model.fit(X_train, y_train, epochs=epochs, batch_size=32, verbose=1)
    return model
