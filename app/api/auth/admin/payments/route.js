import { prisma } from "../../../../../lib/db";
import { getUserFromCookie } from "../../../../../lib/auth";

export async function GET() {
  const admin = await getUserFromCookie();

  if (!admin?.isAdmin) {
    return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 403 });
  }

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, email: true, credits: true }
      }
    }
  });

  return NextResponse.json({ success: true, payments });
}