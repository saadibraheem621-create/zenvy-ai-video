import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req) {
  const session = await getUserFromCookie();

  if (!session?.isAdmin) {
    return Response.json({ success: false, error: "غير مصرح" });
  }

  const form = await req.formData();
  const paymentId = form.get("paymentId");

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId }
  });

  if (!payment || payment.status !== "PENDING") {
    return Response.json({ success: false, error: "طلب غير صالح" });
  }

  await prisma.user.update({
    where: { id: payment.userId },
    data: {
      credits: {
        increment: payment.credits
      }
    }
  });

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: "APPROVED"
    }
  });

  return Response.redirect(new URL("/admin", req.url));
}