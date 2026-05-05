import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
export async function getUserFromCookie() {
  return {
    id: "admin",
    isAdmin: true
  };
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(user) {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}