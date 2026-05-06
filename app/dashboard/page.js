import { prisma } from "../../lib/db";

export default async function Dashboard() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          Zenvy AI Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          منصة الذكاء الاصطناعي الخاصة بك
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2>👥 المستخدمين</h2>
            <h1>{users.length}</h1>
          </div>

          <div style={cardStyle}>
            <h2>🎬 الفيديوهات</h2>
            <h1>0</h1>
          </div>

          <div style={cardStyle}>
            <h2>💳 الأرباح</h2>
            <h1>$0</h1>
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: "20px",
            padding: "25px",
            border: "1px solid #1e293b",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            المستخدمين المسجلين
          </h2>

          {users.map((user) => (
            <div
              key={user.id}
              style={{
                padding: "15px",
                borderBottom: "1px solid #1e293b",
              }}
            >
              <h3>{user.name}</h3>

              <p style={{ color: "#94a3b8" }}>
                {user.email}
              </p>

              <p>Credits: {user.credits}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#111827",
  padding: "25px",
  borderRadius: "20px",
  border: "1px solid #1e293b",
};