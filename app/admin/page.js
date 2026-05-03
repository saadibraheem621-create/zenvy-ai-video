import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export default async function Admin() {
  const session = await getUserFromCookie();

  if (!session?.isAdmin) {
    return <div className="card">غير مصرح</div>;
  }

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }
  });

  return (
    <div className="card">
      <h2>لوحة الإدارة</h2>

      {payments.map((p) => (
        <div key={p.id} className="video-box">
          <p>المستخدم: {p.user.email}</p>
          <p>الطريقة: {p.method}</p>
          <p>المبلغ: ${p.amount}</p>
          <p>Credits: {p.credits}</p>
          <p>الوصل: {p.proof}</p>
          <p>الحالة: {p.status}</p>

          {p.status === "PENDING" && (
            <form action="/api/admin/approve" method="POST">
              <input type="hidden" name="paymentId" value={p.id} />
              <button>موافقة وإضافة Credits</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}