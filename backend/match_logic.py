# backend/match_logic.py

import os
import cohere
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity
from PyPDF2 import PdfReader

import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from rake_nltk import Rake

# --- Ensure NLTK required data is present ---
for resource in ["stopwords", "punkt"]:
    try:
        nltk.data.find(f"corpora/{resource}" if resource == "stopwords" else f"tokenizers/{resource}")
    except LookupError:
        nltk.download(resource)

# --- Load environment variables ---
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

# --- Stopwords + stemmer ---
STOPWORDS = set(stopwords.words("english"))
ps = PorterStemmer()
rake = Rake(stopwords=STOPWORDS)

# -------------------------
# Cohere embedding function
# -------------------------
def get_embedding(text):
    """Get Cohere embedding for a given text."""
    resp = co.embed(
        texts=[text],
        model="embed-english-v3.0",
        input_type="search_document"
    )
    return resp.embeddings[0]

# -------------------------
# PDF text extraction
# -------------------------
def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    text = ""
    with open(pdf_path, "rb") as f:
        reader = PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text.strip()

# -------------------------
# Text preprocessing
# -------------------------
def preprocess_text(text):
    """Tokenize, lowercase, remove stopwords, stem words."""
    tokens = word_tokenize(text.lower())
    filtered = [
        ps.stem(word) for word in tokens
        if word.isalpha() and word not in STOPWORDS
    ]
    return filtered

# -------------------------
# Keyword extraction
# -------------------------
def extract_keywords(text, top_n=10):
    """Extract top_n most frequent stemmed keywords."""
    tokens = preprocess_text(text)
    freq = {}
    for w in tokens:
        freq[w] = freq.get(w, 0) + 1
    sorted_words = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    return [w for w, _ in sorted_words[:top_n]]

def extract_keywords_original(text, top_n=10):
    """Get top keywords without stemming (for display)."""
    tokens = word_tokenize(text.lower())
    filtered = [
        word for word in tokens
        if word.isalpha() and word not in STOPWORDS
    ]
    freq = {}
    for w in filtered:
        freq[w] = freq.get(w, 0) + 1
    sorted_words = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    return [w for w, _ in sorted_words[:top_n]]

# -------------------------
# Phrase extraction
# -------------------------
def extract_phrases(text, max_phrases=10):
    rake.extract_keywords_from_text(text)
    ranked_phrases = rake.get_ranked_phrases()
    return ranked_phrases[:max_phrases]

# -------------------------
# Match logic
# -------------------------
def match_resume_logic(resume_text, job_text):
    # Get embeddings
    resume_emb = get_embedding(resume_text)
    job_emb = get_embedding(job_text)

    # Similarity score
    sim = cosine_similarity([resume_emb], [job_emb])[0][0]
    match_score = round(sim * 100, 2)

    # Phrase matching
    resume_phrases = set(extract_phrases(resume_text))
    job_phrases = set(extract_phrases(job_text))
    missing_phrases = list(job_phrases - resume_phrases)

    suggestions = (
        "Try adding skills like: " + ", ".join(missing_phrases[:5])
        if missing_phrases else "Your resume is well-matched!"
    )

    return match_score, missing_phrases, suggestions
