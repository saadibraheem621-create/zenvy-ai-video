import { prisma } from "../../../../../lib/db";
import { getUserFromCookie } from "../../../../../lib/auth";

export async function POST(req) {
  const admin = await getUserFromCookie();

  if (!admin?.isAdmin) {
    return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 403 });
  }

  const { paymentId } = await req.json();

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId }
  });

  if (!payment) {
    return NextResponse.json({ success: false, error: "طلب الدفع غير موجود" }, { status: 404 });
  }

  if (payment.status === "approved") {
    return NextResponse.json({ success: false, error: "تمت الموافقة مسبقاً" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: { id: paymentId },
      data: { status: "approved" }
    }),

    prisma.user.update({
      where: { id: payment.userId },
      data: {
        credits: {
          increment: payment.credits
        }
      }
    })
  ]);

  return NextResponse.json({ success: true });
}