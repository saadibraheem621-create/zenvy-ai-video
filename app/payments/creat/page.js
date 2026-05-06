"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const params = useSearchParams();

  const credits = params.get("credits");
  const amount = params.get("amount");

  const [method, setMethod] = useState("USDT");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "#111827",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h1>إتمام الدفع</h1>

        <p>Credits: {credits}</p>
        <p>Amount: {amount}</p>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "20px",
            borderRadius: "10px",
            background: "#1e293b",
            color: "white",
          }}
        >
          <option>USDT</option>
          <option>ZainCash</option>
        </select>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#1e293b",
            borderRadius: "12px",
          }}
        >
          {method === "USDT" ? (
            <>
              <h3>USDT Wallet</h3>

              <p>
                TTDgpsoLSry46z2cXaiXd9uxN8vj8pL3ov
              </p>
            </>
          ) : (
            <>
              <h3>Zain Cash</h3>

              <p>0780XXXXXXX</p>
            </>
          )}
        </div>

        <button
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#06b6d4",
            color: "white",
            fontSize: "16px",
          }}
        >
          تم الدفع
        </button>
      </div>
    </div>
  );
}