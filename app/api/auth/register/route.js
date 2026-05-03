import { prisma } from "@/lib/db";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const exists = await prisma.user.findUnique({ where: { email } });

    if (exists) {
      return Response.json({ success: false, error: "البريد مستخدم مسبقاً" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const isAdmin = email === process.env.ADMIN_EMAIL;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        isAdmin
      }
    });

    const token = await createToken(user);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ success: false, error: "حدث خطأ بالتسجيل" });
  }
}