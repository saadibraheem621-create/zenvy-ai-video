"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");

  async function generateVideo() {
    if (!prompt) {
      alert("اكتب وصف الفيديو");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setVideo(
        "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
      );

      setLoading(false);
    }, 3000);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          AI Video Generator
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          اكتب وصف الفيديو وسيتم توليده بالذكاء الاصطناعي
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثال: رجل عربي يقف في مدينة مستقبلية مع تأثيرات سينمائية"
          style={{
            width: "100%",
            height: "140px",
            background: "#111827",
            border: "1px solid #1e293b",
            borderRadius: "15px",
            padding: "20px",
            color: "white",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={generateVideo}
          disabled={loading}
          style={{
            background: "#06b6d4",
            border: "none",
            padding: "15px 30px",
            borderRadius: "12px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {loading ? "جاري التوليد..." : "توليد الفيديو"}
        </button>

        {video && (
          <div
            style={{
              marginTop: "40px",
            }}
          >
            <video
              controls
              width="100%"
              style={{
                borderRadius: "20px",
              }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
}