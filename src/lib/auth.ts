import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_dashboard_key";

export function signToken(username: string) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string };
  } catch (error) {
    return null;
  }
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dashboard_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("dashboard_token", token, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("dashboard_token");
}
