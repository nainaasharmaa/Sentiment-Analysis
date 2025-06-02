# 🎯 Sentiment Analysis Using Neural Networks

This project presents a deep learning-based sentiment analysis system for classifying movie reviews as **positive** or **negative** using the IMDb dataset. The model is built using Keras with TF-IDF for feature extraction and experiments with different combinations of activation functions, optimizers, and loss functions to achieve optimal accuracy.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Results](#results)
- [Future Scope](#future-scope)
- [Contributors](#contributors)

---

## 📖 Overview

Sentiment analysis is a key NLP task that classifies textual data into sentiments such as **positive** or **negative**. In this project:

- The IMDb dataset (50,000 labeled reviews) was used.
- TF-IDF was applied for text vectorization.
- A deep learning model was trained with various hyperparameter combinations.
- The best configuration achieved **96.72% validation accuracy**.

---

## 💻 Tech Stack

- Python
- Flask (for backend)
- HTML/CSS/JS (for frontend)
- Keras / TensorFlow
- NumPy / Pandas / Scikit-learn

---

## 📂 Dataset

- **Source**: IMDb movie reviews
- **Size**: 50,000 reviews
- **Classes**: `positive`, `negative`

Preprocessing steps:
- TF-IDF vectorization with `max_features=5000`
- Label encoding: positive → 1, negative → 0

---

## 🧠 Model Architecture

- **Input**: TF-IDF features
- **Activation Functions Tested**: ReLU, Sigmoid, Tanh
- **Optimizers Tested**: SGD, Adam, RMSprop
- **Loss Functions Tested**: Sparse Categorical Crossentropy, MSE

> ✅ **Best configuration**:
> - Activation: `Sigmoid`
> - Optimizer: `Adam`
> - Loss: `Sparse Categorical Crossentropy`
> - Accuracy: `96.72%`

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sentiment-analysis.git
cd sentiment-analysis

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
