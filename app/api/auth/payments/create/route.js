import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req) {
  const session = await getUserFromCookie();

  if (!session) {
    return Response.json({ success: false, error: "سجل دخول أولاً" });
  }

  const { method, amount, credits, proof } = await req.json();

  await prisma.payment.create({
    data: {
      userId: session.id,
      method,
      amount,
      credits,
      proof
    }
  });

  return Response.json({ success: true });
}