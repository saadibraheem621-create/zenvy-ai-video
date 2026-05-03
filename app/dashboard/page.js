import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getUserFromCookie();

  if (!session) {
    return <div className="card">يرجى تسجيل الدخول أولاً</div>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: {
      videos: {
        orderBy: { createdAt: "desc" }
      },
      payments: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  return (
    <div className="card">
      <h2>لوحة المستخدم</h2>
      <p>مرحباً: {user.name}</p>
      <h3>رصيدك: {user.credits} Credits</h3>

      <a href="/generate">
        <button>توليد فيديو جديد</button>
      </a>

      <a href="/pricing">
        <button>شراء Credits</button>
      </a>

      <h3>آخر الفيديوهات</h3>

      {user.videos.map((v) => (
        <div key={v.id} className="video-box">
          <p>{v.prompt}</p>
          <a href={v.videoUrl} target="_blank">فتح الفيديو</a>
        </div>
      ))}
    </div>
  );
}