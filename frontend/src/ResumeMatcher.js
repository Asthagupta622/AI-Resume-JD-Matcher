import React, { useState } from "react";

function ResumeMatcher() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [analysisStep, setAnalysisStep] = useState("");
  const [skillsChecklist, setSkillsChecklist] = useState({});
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [completedActions, setCompletedActions] = useState([]);

  // FULL PAGE BACKGROUND STYLE - Enhanced for perfect centering
  const pageWrapperStyle = {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: "8px",
    background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    overflowX: "hidden",
    position: "relative"
  };

  // INNER CARD STYLE - Responsive and centered
  const containerStyle = {
    position: "relative",
    padding: "clamp(16px, 4vw, 40px)",
    maxWidth: "min(520px, calc(100vw - 16px))",
    width: "100%",
    margin: "0 auto",
    borderRadius: "clamp(12px, 3vw, 20px)",
    boxShadow: "0 12px 30px rgba(127,0,255,0.6)",
    color: "#eee",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
    overflow: "hidden",
    animation: "fadeIn 1.2s ease forwards",
    zIndex: 1,
    boxSizing: "border-box",
  };

  const glowingCircleStyle = {
    position: "absolute",
    width: "clamp(200px, 50vw, 300px)",
    height: "clamp(200px, 50vw, 300px)",
    background: "radial-gradient(circle at center, rgba(127,0,255,0.6), transparent 70%)",
    borderRadius: "50%",
    top: "clamp(-100px, -15vw, -120px)",
    right: "clamp(-100px, -15vw, -120px)",
    filter: "blur(clamp(40px, 10vw, 80px))",
    animation: "pulseGlow 3s ease-in-out infinite",
    zIndex: 0,
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "clamp(16px, 4vw, 24px)",
    fontWeight: "700",
    fontSize: "clamp(1.25rem, 4vw, 2rem)",
    letterSpacing: "1.2px",
    textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
    lineHeight: "1.2",
    wordWrap: "break-word",
    hyphens: "auto"
  };

  const formGroupStyle = {
    marginBottom: "clamp(16px, 3vw, 20px)",
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    marginBottom: "clamp(4px, 1vw, 6px)",
    fontWeight: "600",
    fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
    color: "#b6aaff",
  };

  const inputFileStyle = {
    padding: "clamp(8px, 2vw, 12px)",
    borderRadius: "clamp(6px, 1.5vw, 8px)",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#8b75d6",
    color: "white",
    fontWeight: "600",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "clamp(13px, 3vw, 15px)",
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const textareaStyle = {
    minHeight: "clamp(80px, 15vw, 110px)",
    maxHeight: "clamp(120px, 25vw, 180px)",
    borderRadius: "clamp(8px, 2vw, 12px)",
    padding: "clamp(8px, 2vw, 12px)",
    fontSize: "clamp(13px, 3vw, 15px)",
    border: "none",
    resize: "vertical",
    fontFamily: "inherit",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    width: "100%",
    boxSizing: "border-box",
    background: "#20144a",
    color: "#ece0ff",
    outline: "none",
    lineHeight: "1.4"
  };

  const buttonStyle = {
    marginTop: "clamp(8px, 2vw, 12px)",
    width: "100%",
    padding: "clamp(12px, 3vw, 14px)",
    borderRadius: "clamp(8px, 2vw, 12px)",
    border: "none",
    fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
    fontWeight: "700",
    cursor: loading ? "not-allowed" : "pointer",
    backgroundColor: btnHover ? "#5a1bff" : "#7a38ff",
    color: "#fff",
    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    opacity: loading ? 0.7 : 1,
    transform: btnHover ? "scale(1.02)" : "scale(1)",
    letterSpacing: "1.1px",
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const progressContainerStyle = {
    marginTop: "clamp(16px, 3vw, 20px)",
    background: "#452b85",
    borderRadius: "clamp(8px, 2vw, 12px)",
    overflow: "hidden",
    height: "clamp(16px, 3vw, 20px)"
  };

  const progressBarStyle = {
    height: "100%",
    backgroundColor: "#b99aff",
    transition: "width 0.4s ease",
    borderRadius: "inherit"
  };

  const resultContainerStyle = {
    marginTop: "clamp(20px, 4vw, 28px)",
    padding: "clamp(12px, 3vw, 16px)",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "clamp(8px, 2vw, 12px)",
    boxShadow: "inset 0 0 10px rgba(255,255,255,0.3)",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    hyphens: "auto"
  };

  const errorTextStyle = {
    marginTop: "clamp(16px, 3vw, 20px)",
    color: "#ff6b6b",
    fontWeight: "700",
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
    fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
    wordWrap: "break-word"
  };

  const fileInfoStyle = {
    marginTop: "clamp(6px, 1.5vw, 7px)",
    fontSize: "clamp(11px, 2.5vw, 13px)",
    color: "#cfc3ff",
    wordWrap: "break-word",
    overflowWrap: "break-word"
  };

  const progressTextStyle = {
    marginTop: "clamp(4px, 1vw, 6px)",
    textAlign: "center",
    fontWeight: "600",
    color: "#d4caff",
    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)"
  };

  // Interactive functions
  const toggleSkillCheck = (skillName) => {
    setSkillsChecklist(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  const markActionComplete = (actionId) => {
    setCompletedActions(prev => [...new Set([...prev, actionId])]);
  };

  const startTutorial = () => {
    setShowTutorial(true);
    setTutorialStep(0);
  };

  const nextTutorialStep = () => {
    setTutorialStep(prev => prev + 1);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    setTutorialStep(0);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDesc.trim()) {
      alert("Upload a PDF resume and paste the job description.");
      return;
    }

    setResult(null);
    setError(null);
    setLoading(true);
    setUploadProgress(0);
    setAnalysisStep("Uploading resume...");

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDesc);
    formData.append("linkedin_url", linkedinUrl);

    const xhr = new XMLHttpRequest();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://ai-resume-jd-matcher-21.onrender.com";
    xhr.open("POST", `${BACKEND_URL}/match`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round(
          (event.loaded / event.total) * 100
        );
        setUploadProgress(percentComplete);
        
        // Update analysis steps
        if (percentComplete < 30) {
          setAnalysisStep("Uploading resume...");
        } else if (percentComplete < 60) {
          setAnalysisStep("Processing PDF content...");
        } else if (percentComplete < 90) {
          setAnalysisStep("Analyzing job requirements...");
        } else {
          setAnalysisStep("Generating AI insights...");
        }
      }
    };

    xhr.onload = () => {
      setLoading(false);
      setAnalysisStep("Analysis complete!");
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          setResult(data);
          
          // Add to score history
          const newEntry = {
            date: new Date().toLocaleDateString(),
            score: data.match_score,
            jobTitle: jobDesc.split('\n')[0].substring(0, 30) + '...'
          };
          setScoreHistory(prev => [newEntry, ...prev.slice(0, 4)]);
          
        } catch {
          setError("Failed to parse server response.");
        }
      } else {
        setError(`Upload failed with status ${xhr.status}`);
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      setError("An error occurred during the upload.");
    };

    xhr.send(formData);
  };

  return (
    <>
      <style>
        {`
        * {
          box-sizing: border-box;
        }
        
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(12px);}
          to {opacity: 1; transform: translateY(0);}
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.72;
            transform: scale(1);
          }
          50% {
            opacity: 0.93;
            transform: scale(1.1);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        html, body, #root {
          margin: 0;
          padding: 0;
          min-width: 0;
          width: 100%;
          overflow-x: hidden;
        }
        
        /* Enhanced responsive breakpoints */
        @media (max-width: 768px) {
          .responsive-heading {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }
          .responsive-label {
            font-size: 0.95rem !important;
          }
          .responsive-textarea {
            font-size: 14px !important;
            min-height: 90px !important;
          }
          .responsive-button {
            font-size: 1rem !important;
            padding: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-heading {
            font-size: 1.3rem !important;
            line-height: 1.2 !important;
          }
          .responsive-label {
            font-size: 0.9rem !important;
          }
          .responsive-textarea {
            font-size: 13px !important;
            min-height: 80px !important;
          }
          .responsive-button {
            font-size: 0.95rem !important;
            padding: 11px !important;
          }
        }
        
        @media (max-width: 320px) {
          .responsive-heading {
            font-size: 1.1rem !important;
            line-height: 1.1 !important;
          }
          .responsive-label {
            font-size: 0.85rem !important;
          }
          .responsive-textarea {
            font-size: 12px !important;
            min-height: 70px !important;
            padding: 8px !important;
          }
          .responsive-button {
            font-size: 0.9rem !important;
            padding: 10px !important;
          }
          .responsive-input {
            font-size: 12px !important;
            padding: 8px !important;
          }
        }
        
        /* Ensure no horizontal scrolling */
        @media (max-width: 280px) {
          .responsive-heading {
            font-size: 1rem !important;
            word-break: break-word !important;
          }
          .responsive-container {
            padding: 8px !important;
            margin: 4px !important;
            max-width: calc(100vw - 8px) !important;
          }
        }
        
        /* Touch-friendly targets */
        @media (hover: none) and (pointer: coarse) {
          button, input[type="file"], textarea {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* High DPI displays */
        @media (min-resolution: 192dpi) {
          .glow-effect {
            filter: blur(calc(clamp(40px, 10vw, 80px) * 0.8));
          }
        }
      `}
      </style>

      <div style={pageWrapperStyle}>
        <div style={glowingCircleStyle} />
        <div style={containerStyle} className="responsive-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(16px, 3vw, 20px)" }}>
            <h2 style={{ ...headingStyle, marginBottom: 0, flex: 1 }} className="responsive-heading">
              AI Resume & Career Optimizer
            </h2>
            <button
              type="button"
              onClick={startTutorial}
              style={{
                padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)",
                background: "rgba(122, 56, 255, 0.2)",
                border: "1px solid #7a38ff",
                borderRadius: "clamp(6px, 1.5vw, 8px)",
                color: "#7a38ff",
                fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#7a38ff";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(122, 56, 255, 0.2)";
                e.target.style.color = "#7a38ff";
              }}
            >
              📚 Tutorial
            </button>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: "flex",
            marginBottom: "clamp(16px, 3vw, 20px)",
            borderRadius: "clamp(8px, 2vw, 12px)",
            background: "rgba(255,255,255,0.1)",
            padding: "4px",
            gap: "4px"
          }}>
            {[
              { id: "basic", label: "Basic Match" },
              { id: "advanced", label: "AI Analysis" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "clamp(8px, 2vw, 12px)",
                  borderRadius: "clamp(6px, 1.5vw, 8px)",
                  border: "none",
                  fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: activeTab === tab.id ? "#7a38ff" : "transparent",
                  color: activeTab === tab.id ? "#fff" : "#b6aaff",
                  transition: "all 0.3s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label style={labelStyle} className="responsive-label">
                Resume (PDF):
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                required
                style={inputFileStyle}
                className="responsive-input"
              />
              {resumeFile && (
                <p style={fileInfoStyle}>
                  File: <span style={{ fontWeight: 600, color: "#e6c9ff" }}>
                    {resumeFile.name}
                  </span>
                </p>
              )}
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle} className="responsive-label">
                Job Description:
              </label>
              <textarea
                style={textareaStyle}
                className="responsive-textarea"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                required
              />
            </div>

            {activeTab === "advanced" && (
              <div style={formGroupStyle}>
                <label style={labelStyle} className="responsive-label">
                  LinkedIn Profile URL (Optional):
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  style={{
                    ...inputFileStyle,
                    backgroundColor: "#20144a",
                    color: "#ece0ff",
                    fontSize: "clamp(13px, 3vw, 15px)"
                  }}
                  className="responsive-input"
                />
                <p style={{
                  ...fileInfoStyle,
                  color: "#b6aaff",
                  fontSize: "clamp(10px, 2vw, 12px)"
                }}>
                  For LinkedIn optimization and consistency check
                </p>
              </div>
            )}

            <button
              type="submit"
              style={buttonStyle}
              className="responsive-button"
              disabled={loading}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              {loading ? "Analyzing..." : activeTab === "basic" ? "Match Resume" : "AI Deep Analysis"}
            </button>
          </form>

          {loading && (
            <div style={{ marginTop: "clamp(16px, 3vw, 20px)" }}>
              <div style={{
                background: "rgba(122, 56, 255, 0.1)",
                padding: "clamp(12px, 3vw, 16px)",
                borderRadius: "clamp(8px, 2vw, 12px)",
                border: "1px solid rgba(122, 56, 255, 0.2)",
                marginBottom: "clamp(12px, 3vw, 16px)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(8px, 2vw, 12px)",
                  marginBottom: "clamp(8px, 2vw, 12px)"
                }}>
                  <div style={{
                    width: "clamp(16px, 4vw, 20px)",
                    height: "clamp(16px, 4vw, 20px)",
                    border: "2px solid #7a38ff",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }}></div>
                  <span style={{
                    fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                    color: "#7a38ff",
                    fontWeight: "600"
                  }}>
                    {analysisStep}
                  </span>
                </div>
                
                <div style={progressContainerStyle}>
                  <div style={{ ...progressBarStyle, width: `${uploadProgress}%` }} />
                </div>
                <div style={progressTextStyle}>
                  {uploadProgress}% complete
                </div>
              </div>
            </div>
          )}

          {error && (
            <div style={errorTextStyle}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && !result.error && (
            <div style={resultContainerStyle}>
              {/* Match Score Header */}
              <div style={{ textAlign: "center", marginBottom: "clamp(20px, 4vw, 24px)" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "clamp(60px, 12vw, 80px)",
                  height: "clamp(60px, 12vw, 80px)",
                  borderRadius: "50%",
                  background: `conic-gradient(#7a38ff ${result.match_score * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
                  marginBottom: "clamp(12px, 2vw, 16px)"
                }}>
                  <div style={{
                    width: "clamp(50px, 10vw, 70px)",
                    height: "clamp(50px, 10vw, 70px)",
                    borderRadius: "50%",
                    background: "#0D1B2A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                    fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {result.match_score}%
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: "clamp(1.1rem, 3vw, 1.3rem)", 
                  margin: 0,
                  color: "#fff"
                }}>
                  Resume Match Score
                </h3>
              </div>

              {/* Results Tabs */}
              <div style={{
                display: "flex",
                marginBottom: "clamp(16px, 3vw, 20px)",
                borderRadius: "clamp(6px, 1.5vw, 8px)",
                background: "rgba(255,255,255,0.05)",
                padding: "3px",
                fontSize: "clamp(0.7rem, 2vw, 0.85rem)"
              }}>
                {[
                  { id: "basic", label: "Match" },
                  { id: "skills", label: "Skills" },
                  { id: "linkedin", label: "LinkedIn" }
                ].map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      padding: "clamp(6px, 1.5vw, 8px)",
                      borderRadius: "clamp(4px, 1vw, 6px)",
                      border: "none",
                      fontSize: "inherit",
                      fontWeight: "600",
                      cursor: "pointer",
                      background: activeTab === tab.id ? "#7a38ff" : "transparent",
                      color: activeTab === tab.id ? "#fff" : "#b6aaff",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Basic Match Results */}
              {activeTab === "basic" && (
                <div>
                  <div style={{ marginBottom: "clamp(16px, 3vw, 20px)" }}>
                    <strong style={{ color: "#b6aaff", fontSize: "clamp(0.9rem, 2.5vw, 1rem)" }}>
                      Suggestions:
                    </strong>
                    <p style={{ 
                      marginTop: "clamp(6px, 1.5vw, 8px)", 
                      fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                      lineHeight: "1.5",
                      color: "#ece0ff",
                      background: "rgba(122, 56, 255, 0.1)",
                      padding: "clamp(8px, 2vw, 12px)",
                      borderRadius: "clamp(6px, 1.5vw, 8px)",
                      borderLeft: "3px solid #7a38ff"
                    }}>
                      {result.suggestions}
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: "clamp(16px, 3vw, 20px)" }}>
                    <strong style={{ color: "#b6aaff", fontSize: "clamp(0.9rem, 2.5vw, 1rem)" }}>
                      Missing Keywords:
                    </strong>
                    <div style={{
                      marginTop: "clamp(6px, 1.5vw, 8px)",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "clamp(4px, 1vw, 6px)"
                    }}>
                      {result.missing_keywords.map((keyword, index) => (
                        <span
                          key={index}
                          style={{
                            background: "rgba(255, 107, 107, 0.2)",
                            color: "#ff6b6b",
                            padding: "clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)",
                            borderRadius: "clamp(12px, 3vw, 16px)",
                            fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                            fontWeight: "500",
                            border: "1px solid rgba(255, 107, 107, 0.3)"
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Skill Gap Analysis */}
              {activeTab === "skills" && result.skill_gap_analysis && (
                <div>
                  {/* Progress Overview */}
                  <div style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    padding: "clamp(12px, 3vw, 16px)",
                    borderRadius: "clamp(8px, 2vw, 12px)",
                    marginBottom: "clamp(16px, 3vw, 20px)",
                    border: "1px solid rgba(34, 197, 94, 0.2)"
                  }}>
                    <h4 style={{
                      color: "#22c55e",
                      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                      margin: "0 0 clamp(8px, 2vw, 12px) 0"
                    }}>
                      🎯 Your Career Progress
                    </h4>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "clamp(12px, 3vw, 16px)",
                      flexWrap: "wrap"
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{
                          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                          fontWeight: "bold",
                          color: "#22c55e"
                        }}>
                          {Object.values(skillsChecklist).filter(Boolean).length}
                        </div>
                        <div style={{
                          fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                          color: "#ece0ff"
                        }}>
                          Skills Learned
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{
                          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                          fontWeight: "bold",
                          color: "#7a38ff"
                        }}>
                          {completedActions.length}
                        </div>
                        <div style={{
                          fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                          color: "#ece0ff"
                        }}>
                          Actions Done
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{
                          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                          fontWeight: "bold",
                          color: "#ff6b6b"
                        }}>
                          {scoreHistory.length > 1 ? 
                            `+${Math.max(0, scoreHistory[0].score - scoreHistory[1].score)}%` : 
                            '+0%'
                          }
                        </div>
                        <div style={{
                          fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                          color: "#ece0ff"
                        }}>
                          Improvement
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "clamp(16px, 3vw, 20px)" }}>
                    <h4 style={{ 
                      color: "#7a38ff", 
                      fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                      margin: "0 0 clamp(8px, 2vw, 12px) 0"
                    }}>
                      🔍 Skill Gap Analysis
                    </h4>
                    <div style={{
                      background: "rgba(122, 56, 255, 0.1)",
                      padding: "clamp(12px, 3vw, 16px)",
                      borderRadius: "clamp(8px, 2vw, 12px)",
                      border: "1px solid rgba(122, 56, 255, 0.2)"
                    }}>
                      {result.skill_gap_analysis.critical_skills && result.skill_gap_analysis.critical_skills.length > 0 && (
                        <div style={{ marginBottom: "clamp(12px, 3vw, 16px)" }}>
                          <strong style={{ color: "#ff6b6b", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)" }}>
                            ⚠️ Critical Skills Missing:
                          </strong>
                          <div style={{ marginTop: "clamp(6px, 1.5vw, 8px)" }}>
                            {result.skill_gap_analysis.critical_skills.map((skill, index) => (
                              <div key={index} style={{
                                background: "rgba(255, 107, 107, 0.15)",
                                padding: "clamp(8px, 2vw, 10px)",
                                borderRadius: "clamp(6px, 1.5vw, 8px)",
                                marginBottom: "clamp(6px, 1.5vw, 8px)",
                                border: "1px solid rgba(255, 107, 107, 0.3)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                              }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ 
                                    fontWeight: "600", 
                                    color: "#ff6b6b",
                                    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)"
                                  }}>
                                    {skill.name}
                                  </div>
                                  <div style={{ 
                                    fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                                    color: "#ece0ff",
                                    marginTop: "clamp(4px, 1vw, 6px)"
                                  }}>
                                    Priority: High | Market Demand: {skill.market_demand}%
                                  </div>
                                </div>
                                <label style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "clamp(4px, 1vw, 6px)",
                                  cursor: "pointer",
                                  fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                                  color: "#b6aaff"
                                }}>
                                  <input
                                    type="checkbox"
                                    checked={skillsChecklist[skill.name] || false}
                                    onChange={() => toggleSkillCheck(skill.name)}
                                    style={{
                                      width: "clamp(16px, 4vw, 18px)",
                                      height: "clamp(16px, 4vw, 18px)",
                                      accentColor: "#7a38ff"
                                    }}
                                  />
                                  Learned
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {result.skill_gap_analysis.learning_paths && result.skill_gap_analysis.learning_paths.length > 0 && (
                        <div>
                          <strong style={{ color: "#b6aaff", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)" }}>
                            📚 Recommended Learning Path:
                          </strong>
                          <div style={{ marginTop: "clamp(8px, 2vw, 10px)" }}>
                            {result.skill_gap_analysis.learning_paths.map((course, index) => (
                              <div key={index} style={{
                                background: "rgba(182, 170, 255, 0.1)",
                                padding: "clamp(10px, 2.5vw, 12px)",
                                borderRadius: "clamp(6px, 1.5vw, 8px)",
                                marginBottom: "clamp(8px, 2vw, 10px)",
                                border: "1px solid rgba(182, 170, 255, 0.2)"
                              }}>
                                <div style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  flexWrap: "wrap",
                                  gap: "clamp(8px, 2vw, 12px)"
                                }}>
                                  <div style={{ flex: 1, minWidth: "200px" }}>
                                    <div style={{ 
                                      fontWeight: "600", 
                                      color: "#b6aaff",
                                      fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                                      marginBottom: "clamp(4px, 1vw, 6px)"
                                    }}>
                                      {course.title}
                                    </div>
                                    <div style={{ 
                                      fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                                      color: "#ece0ff",
                                      marginBottom: "clamp(4px, 1vw, 6px)"
                                    }}>
                                      {course.provider} • {course.duration} • {course.level}
                                    </div>
                                    <div style={{ 
                                      fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                                      color: "#d4caff",
                                      marginBottom: "clamp(6px, 1.5vw, 8px)"
                                    }}>
                                      Skills: {course.skills.join(", ")}
                                    </div>
                                    <div style={{
                                      display: "flex",
                                      gap: "clamp(8px, 2vw, 12px)",
                                      alignItems: "center"
                                    }}>
                                      <button
                                        onClick={() => markActionComplete(`course-${index}`)}
                                        style={{
                                          padding: "clamp(4px, 1vw, 6px) clamp(8px, 2vw, 10px)",
                                          background: completedActions.includes(`course-${index}`) 
                                            ? "#22c55e" : "rgba(122, 56, 255, 0.3)",
                                          color: "#fff",
                                          border: "none",
                                          borderRadius: "clamp(4px, 1vw, 6px)",
                                          fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                                          cursor: "pointer",
                                          fontWeight: "500"
                                        }}
                                      >
                                        {completedActions.includes(`course-${index}`) ? "✓ Added to Plan" : "Add to Plan"}
                                      </button>
                                    </div>
                                  </div>
                                  <div style={{
                                    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                                    fontWeight: "600",
                                    color: "#7a38ff",
                                    background: "rgba(122, 56, 255, 0.2)",
                                    padding: "clamp(4px, 1vw, 6px) clamp(8px, 2vw, 10px)",
                                    borderRadius: "clamp(12px, 3vw, 16px)",
                                    whiteSpace: "nowrap"
                                  }}>
                                    {course.price}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn Analysis */}
              {activeTab === "linkedin" && result.linkedin_analysis && (
                <div>
                  <h4 style={{ 
                    color: "#0077b5", 
                    fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                    margin: "0 0 clamp(8px, 2vw, 12px) 0"
                  }}>
                    💼 LinkedIn Optimization
                  </h4>
                  
                  {result.linkedin_analysis.consistency_score && (
                    <div style={{
                      background: "rgba(0, 119, 181, 0.1)",
                      padding: "clamp(12px, 3vw, 16px)",
                      borderRadius: "clamp(8px, 2vw, 12px)",
                      marginBottom: "clamp(12px, 3vw, 16px)",
                      border: "1px solid rgba(0, 119, 181, 0.2)"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "clamp(8px, 2vw, 12px)"
                      }}>
                        <strong style={{ color: "#0077b5", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)" }}>
                          Resume-LinkedIn Consistency:
                        </strong>
                        <span style={{
                          background: result.linkedin_analysis.consistency_score >= 80 ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 107, 107, 0.2)",
                          color: result.linkedin_analysis.consistency_score >= 80 ? "#22c55e" : "#ff6b6b",
                          padding: "clamp(4px, 1vw, 6px) clamp(8px, 2vw, 10px)",
                          borderRadius: "clamp(12px, 3vw, 16px)",
                          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                          fontWeight: "600"
                        }}>
                          {result.linkedin_analysis.consistency_score}%
                        </span>
                      </div>
                      
                      {result.linkedin_analysis.headline_suggestions && (
                        <div style={{ marginBottom: "clamp(12px, 3vw, 16px)" }}>
                          <strong style={{ color: "#b6aaff", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)" }}>
                            Suggested LinkedIn Headline:
                          </strong>
                          <p style={{
                            marginTop: "clamp(6px, 1.5vw, 8px)",
                            padding: "clamp(8px, 2vw, 12px)",
                            background: "rgba(122, 56, 255, 0.1)",
                            borderRadius: "clamp(6px, 1.5vw, 8px)",
                            fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                            color: "#ece0ff",
                            fontStyle: "italic",
                            border: "1px solid rgba(122, 56, 255, 0.2)"
                          }}>
                            "{result.linkedin_analysis.headline_suggestions}"
                          </p>
                        </div>
                      )}

                      {result.linkedin_analysis.optimization_tips && result.linkedin_analysis.optimization_tips.length > 0 && (
                        <div>
                          <strong style={{ color: "#b6aaff", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)" }}>
                            LinkedIn Optimization Tips:
                          </strong>
                          <ul style={{
                            marginTop: "clamp(6px, 1.5vw, 8px)",
                            paddingLeft: "clamp(16px, 4vw, 20px)",
                            color: "#ece0ff",
                            fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                            lineHeight: "1.4"
                          }}>
                            {result.linkedin_analysis.optimization_tips.map((tip, index) => (
                              <li key={index} style={{ marginBottom: "clamp(4px, 1vw, 6px)" }}>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Score History */}
              {scoreHistory.length > 0 && (
                <div style={{
                  marginTop: "clamp(16px, 3vw, 20px)",
                  background: "rgba(122, 56, 255, 0.05)",
                  padding: "clamp(12px, 3vw, 16px)",
                  borderRadius: "clamp(8px, 2vw, 12px)",
                  border: "1px solid rgba(122, 56, 255, 0.1)"
                }}>
                  <h4 style={{
                    color: "#7a38ff",
                    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                    margin: "0 0 clamp(8px, 2vw, 12px) 0"
                  }}>
                    📈 Your Progress History
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1.5vw, 8px)" }}>
                    {scoreHistory.map((entry, index) => (
                      <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "clamp(6px, 1.5vw, 8px)",
                        background: index === 0 ? "rgba(122, 56, 255, 0.1)" : "rgba(255,255,255,0.03)",
                        borderRadius: "clamp(4px, 1vw, 6px)"
                      }}>
                        <div style={{
                          fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                          color: "#ece0ff"
                        }}>
                          {entry.date} • {entry.jobTitle}
                        </div>
                        <div style={{
                          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                          fontWeight: "bold",
                          color: entry.score >= 80 ? "#22c55e" : entry.score >= 60 ? "#f59e0b" : "#ff6b6b"
                        }}>
                          {entry.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tutorial Modal */}
          {showTutorial && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "clamp(16px, 4vw, 24px)"
            }}>
              <div style={{
                background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
                padding: "clamp(20px, 5vw, 32px)",
                borderRadius: "clamp(12px, 3vw, 20px)",
                maxWidth: "min(500px, calc(100vw - 32px))",
                width: "100%",
                border: "1px solid rgba(122, 56, 255, 0.3)",
                boxShadow: "0 20px 40px rgba(122, 56, 255, 0.2)"
              }}>
                {tutorialStep === 0 && (
                  <div>
                    <h3 style={{
                      color: "#7a38ff",
                      fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                      marginBottom: "clamp(12px, 3vw, 16px)",
                      textAlign: "center"
                    }}>
                      🚀 Welcome to AI Resume Optimizer!
                    </h3>
                    <p style={{
                      color: "#ece0ff",
                      fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                      lineHeight: "1.5",
                      marginBottom: "clamp(16px, 4vw, 20px)"
                    }}>
                      This powerful tool goes beyond basic keyword matching. Get personalized learning paths, 
                      LinkedIn optimization, and track your career progress with interactive features.
                    </p>
                  </div>
                )}

                {tutorialStep === 1 && (
                  <div>
                    <h3 style={{
                      color: "#7a38ff",
                      fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                      marginBottom: "clamp(12px, 3vw, 16px)",
                      textAlign: "center"
                    }}>
                      📊 Smart Analysis Modes
                    </h3>
                    <div style={{ color: "#ece0ff", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)", lineHeight: "1.5" }}>
                      <div style={{ marginBottom: "clamp(8px, 2vw, 12px)" }}>
                        <strong style={{ color: "#b6aaff" }}>Basic Match:</strong> Quick keyword analysis and scoring
                      </div>
                      <div>
                        <strong style={{ color: "#b6aaff" }}>AI Analysis:</strong> Deep skill gap analysis, learning paths, 
                        and LinkedIn optimization with course recommendations
                      </div>
                    </div>
                  </div>
                )}

                {tutorialStep === 2 && (
                  <div>
                    <h3 style={{
                      color: "#7a38ff",
                      fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                      marginBottom: "clamp(12px, 3vw, 16px)",
                      textAlign: "center"
                    }}>
                      🎯 Interactive Features
                    </h3>
                    <div style={{ color: "#ece0ff", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)", lineHeight: "1.5" }}>
                      <div style={{ marginBottom: "clamp(6px, 1.5vw, 8px)" }}>
                        ✅ Check off skills as you learn them
                      </div>
                      <div style={{ marginBottom: "clamp(6px, 1.5vw, 8px)" }}>
                        📚 Add courses to your learning plan
                      </div>
                      <div style={{ marginBottom: "clamp(6px, 1.5vw, 8px)" }}>
                        📈 Track your resume score improvements
                      </div>
                      <div>
                        💼 Get personalized LinkedIn headline suggestions
                      </div>
                    </div>
                  </div>
                )}

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "clamp(20px, 5vw, 24px)"
                }}>
                  <button
                    onClick={closeTutorial}
                    style={{
                      padding: "clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "clamp(6px, 1.5vw, 8px)",
                      color: "#ece0ff",
                      fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                      cursor: "pointer"
                    }}
                  >
                    Skip Tutorial
                  </button>
                  
                  <div style={{ display: "flex", gap: "clamp(8px, 2vw, 12px)" }}>
                    {tutorialStep > 0 && (
                      <button
                        onClick={() => setTutorialStep(tutorialStep - 1)}
                        style={{
                          padding: "clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)",
                          background: "rgba(122, 56, 255, 0.3)",
                          border: "1px solid #7a38ff",
                          borderRadius: "clamp(6px, 1.5vw, 8px)",
                          color: "#7a38ff",
                          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                          cursor: "pointer"
                        }}
                      >
                        Previous
                      </button>
                    )}
                    
                    {tutorialStep < 2 ? (
                      <button
                        onClick={nextTutorialStep}
                        style={{
                          padding: "clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)",
                          background: "#7a38ff",
                          border: "1px solid #7a38ff",
                          borderRadius: "clamp(6px, 1.5vw, 8px)",
                          color: "#fff",
                          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                          cursor: "pointer",
                          fontWeight: "600"
                        }}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={closeTutorial}
                        style={{
                          padding: "clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)",
                          background: "#7a38ff",
                          border: "1px solid #7a38ff",
                          borderRadius: "clamp(6px, 1.5vw, 8px)",
                          color: "#fff",
                          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                          cursor: "pointer",
                          fontWeight: "600"
                        }}
                      >
                        Get Started!
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ResumeMatcher;
