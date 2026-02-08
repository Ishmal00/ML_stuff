import streamlit as st
import pandas as pd
import pickle

# Load model
with open("medicine_model.pkl", "rb") as f:
    model = pickle.load(f)

# Load encoders
with open("encoders.pkl", "rb") as f:
    encoders = pickle.load(f)

# Load dataset (for dropdown values)
df = pd.read_csv("medicine_recommendation_dataset.csv")

# Page config
st.set_page_config(page_title="Medicine Recommendation", page_icon="🩺")

# Custom CSS
st.markdown("""
<style>
.stApp {
    background: linear-gradient(135deg, #667eea, #764ba2);
}
.main {
    background: white;
    padding: 30px;
    border-radius: 15px;
}
.result {
    background: #e8f5e9;
    padding: 15px;
    border-left: 6px solid #4CAF50;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;
}
</style>
""", unsafe_allow_html=True)

st.markdown("<div class='main'>", unsafe_allow_html=True)

# Title
st.markdown("<h1 style='text-align:center;'>🩺 Medicine Recommendation System</h1>", unsafe_allow_html=True)

# Inputs

symptom = st.selectbox(
    "Select Symptom",
    sorted(df['Symptom'].dropna().astype(str).unique())
)

disease = st.selectbox(
    "Select Disease",
    sorted(df['Disease'].dropna().astype(str).unique())
)




if st.button("Get Recommendation"):
    # Create input dataframe
    input_df = pd.DataFrame({
        'Symptom': [symptom],
        'Disease': [disease]
    })

    # Encode input
    for col in input_df.columns:
        input_df[col] = encoders[col].transform(input_df[col])

    # Predict
    prediction = model.predict(input_df)

    # Decode output
    medicine = encoders['Recommended Medicine'].inverse_transform(prediction)[0]

    # Show result
    st.markdown(
        f"<div class='result'>💊 Recommended Medicine: {medicine}</div>",
        unsafe_allow_html=True
    )

st.markdown("</div>", unsafe_allow_html=True)
