import { prisma } from "@/lib/db";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Response.json({ success: false, error: "الحساب غير موجود" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return Response.json({ success: false, error: "كلمة المرور خطأ" });
    }

    const token = await createToken(user);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "فشل تسجيل الدخول" });
  }
}