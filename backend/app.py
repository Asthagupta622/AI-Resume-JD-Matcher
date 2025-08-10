# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
from match_logic import extract_text_from_pdf, match_resume_logic

app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "*"}})

@app.route("/")
def home():
    return jsonify({"message": "Backend is working"}), 200

@app.route("/match", methods=["POST"])
def match_resume():
    # Expecting multipart/form-data:
    # - file field: "resume" (PDF)
    # - form field: "job_description" (string)
    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded (field name must be 'resume')"}), 400

    resume_file = request.files["resume"]
    job_desc = request.form.get("job_description", "").strip()
    if not job_desc:
        return jsonify({"error": "job_description form field is required"}), 400

    # Save resume to a temporary file and extract text
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            resume_file.save(tmp.name)
            resume_text = extract_text_from_pdf(tmp.name)
    except Exception as e:
        return jsonify({"error": f"Failed to read PDF: {e}"}), 500

    # Run matching logic
    try:
        score, missing_keywords, suggestions = match_resume_logic(resume_text, job_desc)
        return jsonify({
            "match_score": score,
            "missing_keywords": missing_keywords,
            "suggestions": suggestions
        })
    except Exception as e:
        return jsonify({"error": f"Matching failed: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
