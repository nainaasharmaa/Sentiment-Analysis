from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import preprocess

app = Flask(__name__)
CORS(app)
model = load_model("my_model.h5")
_, _, _, _, tokenizer = preprocess.load_and_preprocess_data('IMDB Dataset.csv')
 
@app.route('/')
def home():
    return render_template("main.html")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('review', '')

    text_clean = preprocess.clean_text(text)
    sequence = tokenizer.texts_to_sequences([text_clean])
    padded = pad_sequences(sequence, maxlen=5000, padding='post', truncating='post')
    prediction = model.predict(padded)[0][0]

    sentiment = "Positive" if prediction >= 0.5 else "Negative"
    confidence = round(prediction * 100 if prediction >= 0.5 else (1 - prediction) * 100, 2)

    return jsonify({
        "sentiment": sentiment,
        "confidence": confidence,
        "sentiment_class": "Positive" if sentiment == "Positive" else "Negative"
    })

if __name__ == '__main__':
    app.run(debug=True)
