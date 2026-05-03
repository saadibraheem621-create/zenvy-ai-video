"use client";

import { useState } from "react";

export default function Pricing() {
  const [msg, setMsg] = useState("");

  async function buy(method, amount, credits) {
    const proof = prompt("اكتب رقم العملية أو رابط صورة الوصل:");

    const res = await fetch("/api/payments/create", {
      method: "POST",
      body: JSON.stringify({
        method,
        amount,
        credits,
        proof
      })
    });

    const data = await res.json();

    if (data.success) {
      setMsg("تم إرسال طلب الدفع. انتظر موافقة الإدارة.");
    } else {
      setMsg(data.error);
    }
  }

  return (
    <div>
      <h1 className="hero">باقات Credits</h1>

      <div className="grid">
        <div className="card">
          <h2>Starter</h2>
          <p>100 Credits</p>
          <h3>$10</h3>
          <button onClick={() => buy("USDT", 10, 100)}>دفع USDT</button>
          <br /><br />
          <button onClick={() => buy("ZAINCASH", 10, 100)}>دفع ZainCash</button>
        </div>

        <div className="card">
          <h2>Pro</h2>
          <p>300 Credits</p>
          <h3>$25</h3>
          <button onClick={() => buy("USDT", 25, 300)}>دفع USDT</button>
          <br /><br />
          <button onClick={() => buy("ZAINCASH", 25, 300)}>دفع ZainCash</button>
        </div>

        <div className="card">
          <h2>Business</h2>
          <p>800 Credits</p>
          <h3>$60</h3>
          <button onClick={() => buy("USDT", 60, 800)}>دفع USDT</button>
          <br /><br />
          <button onClick={() => buy("ZAINCASH", 60, 800)}>دفع ZainCash</button>
        </div>
      </div>

      <div className="card">
        <p>{msg}</p>
        <p className="small">USDT TRC20: ضع محفظتك داخل .env</p>
        <p className="small">ZainCash: ضع رقمك داخل .env</p>
      </div>
    </div>
  );
}