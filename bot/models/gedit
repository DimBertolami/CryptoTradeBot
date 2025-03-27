def train_xgboost(X_train, y_train):
    y_train = y_train.replace({-1: 0, 1: 1, 0: 2})  # Ensure labels start at 0
    model = xgb.XGBClassifier(objective='multi:softmax', num_class=2, eval_metric='mlogloss', n_estimators=100, max_depth=3, max_leaves=5)
    model.fit(X_train, y_train)
    return model
