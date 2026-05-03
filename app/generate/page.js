"use client";

import { useState } from "react";

export default function Generate() {
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    setMsg("جاري توليد الفيديو...");

    const res = await fetch("/api/videos/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: form.get("prompt"),
        style: form.get("style"),
        duration: Number(form.get("duration"))
      })
    });

    const data = await res.json();

    if (data.success) {
      setResult(data.video);
      setMsg("تم توليد الفيديو بنجاح");
    } else {
      setMsg(data.error);
    }
  }

  return (
    <div className="card">
      <h2>توليد فيديو AI</h2>

      <form onSubmit={submit}>
        <textarea name="prompt" placeholder="اكتب وصف الفيديو..." required />

        <select name="style">
          <option value="cinematic">Cinematic</option>
          <option value="cartoon">Cartoon</option>
          <option value="advertising">Advertising</option>
          <option value="tiktok">TikTok Short</option>
        </select>

        <select name="duration">
          <option value="5">5 ثواني - 20 Credits</option>
          <option value="10">10 ثواني - 35 Credits</option>
        </select>

        <button>Generate Video</button>
      </form>

      <p>{msg}</p>

      {result && (
        <div className="video-box">
          <h3>الفيديو جاهز</h3>
          <a href={result.videoUrl} target="_blank">تحميل / مشاهدة الفيديو</a>
        </div>
      )}
    </div>
  );
}