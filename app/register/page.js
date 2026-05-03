"use client";

import { useState } from "react";

export default function Register() {
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
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
      <h2>إنشاء حساب</h2>

      <form onSubmit={submit}>
        <input name="name" placeholder="الاسم" required />
        <input name="email" type="email" placeholder="البريد" required />
        <input name="password" type="password" placeholder="كلمة المرور" required />
        <button>تسجيل</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}