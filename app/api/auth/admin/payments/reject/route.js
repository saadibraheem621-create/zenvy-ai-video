import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req) {
  const admin = await getUserFromCookie();

  if (!admin?.isAdmin) {
    return NextResponse.json({ success: false, error: "غير مصرح" }, { status: 403 });
  }

  const { paymentId } = await req.json();

  await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "rejected" }
  });

  return NextResponse.json({ success: true });
}