import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export async function GET() {
  const session = await getUserFromCookie();

  if (!session?.isAdmin) {
    return Response.json({ success: false, error: "غير مصرح" });
  }

  const payments = await prisma.payment.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });

  return Response.json({ success: true, payments });
}