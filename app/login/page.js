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
    <div className="relative">
  <input
    type={show ? "text" : "password"}
    placeholder="كلمة المرور"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="p-3 w-full border rounded-lg"
  />

  <button
    type="button"
    onClick={() => setShow(!show)}
    className="absolute right-3 top-3 text-xl"
  >
    {show ? "🙈" : "👁️"}
  </button>
</div>