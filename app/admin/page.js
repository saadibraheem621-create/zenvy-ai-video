"use client";

export { useEffect, useState } from "react";

export default function AdminPage() {
  const [payments, setPayments] = useState([]);
  const [msg, setMsg] = useState("");

  async function loadPayments() {
    const res = await fetch("/api/admin/payments");
    const data = await res.json();

    if (data.success) {
      setPayments(data.payments);
    } else {
      setMsg(data.error || "خطأ بجلب الطلبات");
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function approve(paymentId) {
    const res = await fetch("/api/admin/payments/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId })
    });

    const data = await res.json();

    if (data.success) {
      setMsg("تمت الموافقة وزيادة الرصيد");
      loadPayments();
    } else {
      setMsg(data.error || "فشل approve");
    }
  }

  async function reject(paymentId) {
    const res = await fetch("/api/admin/payments/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId })
    });

    const data = await res.json();

    if (data.success) {
      setMsg("تم رفض الطلب");
      loadPayments();
    } else {
      setMsg(data.error || "فشل reject");
    }
  }

  return (
    <div className="card" style={{ width: "90%", maxWidth: "1100px" }}>
      <h2>لوحة الإدارة</h2>
      <p>{msg}</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>المستخدم</th>
            <th>الإيميل</th>
            <th>المبلغ</th>
            <th>Credits</th>
            <th>الحالة</th>
            <th>إجراء</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.user?.name}</td>
              <td>{p.user?.email}</td>
              <td>{p.amount}</td>
              <td>{p.credits}</td>
              <td>{p.status}</td>
              <td>
                {p.status === "pending" ? (
                  <>
                    <button onClick={() => approve(p.id)}>Approve</button>
                    <button onClick={() => reject(p.id)} style={{ marginRight: "8px" }}>
                      Reject
                    </button>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}