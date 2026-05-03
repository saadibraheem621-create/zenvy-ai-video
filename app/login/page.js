"use client";

import { useState } from "react";

export default function Login() {
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });

    const data = await res.json();

    if (data.success) {
      location.href = "/dashboard";
    } else {
      setMsg(data.error);
    }
  }

  return (
    <div className="card">
      <h2>تسجيل الدخول</h2>

      <form onSubmit={submit}>
        <input name="email" type="email" placeholder="البريد" required />
        <input name="password" type="password" placeholder="كلمة المرور" required />
        <button>دخول</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}