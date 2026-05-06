import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/db";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: "املأ كل الحقول"
      });
    }

    const exists = await prisma.user.findUnique({
      where: { email }
    });

    if (exists) {
      return NextResponse.json({
        success: false,
        error: "هذا البريد مسجل مسبقاً"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        
      }
    });

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}