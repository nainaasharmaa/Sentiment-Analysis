import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer

# Load dataset
df = pd.read_csv('IMDB Dataset.csv')

# Separate features and target
X_text = df['review']
y = df['sentiment']

# Encode target labels (positive -> 1, negative -> 0)
le = LabelEncoder()
y = le.fit_transform(y)

# Convert text to numerical features using TF-IDF
vectorizer = TfidfVectorizer(max_features=5000)  # You can adjust features
X = vectorizer.fit_transform(X_text).toarray()

# Optional: Standardize (usually not needed with TF-IDF, but shown here)
# scaler = StandardScaler()
# X = scaler.fit_transform(X)

# Split data
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

model = Sequential()
model.add(Dense(128, activation='sigmoid', input_shape=(X.shape[1],)))
model.add(Dense(64, activation='sigmoid'))
model.add(Dense(len(np.unique(y)), activation='softmax'))  

model.compile(optimizer=Adam(),
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

history = model.fit(X_train, y_train,
                    epochs=20,
                    batch_size=32,
                    validation_data=(X_val, y_val))

val_loss, val_accuracy = model.evaluate(X_val, y_val)
print(f"\nValidation Accuracy: {val_accuracy:.4f}")

model.save('my_model.h5')  