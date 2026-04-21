import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "pl_admin_session";
const MAX_AGE_SEC = 60 * 60 * 12; // 12h

function getSecret() {
  return process.env.ADMIN_TOKEN_SECRET || "dev-secret-change-me";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const issued = Date.now().toString();
  const sig = sign(issued);
  return `${issued}.${sig}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [issued, sig] = token.split(".");
  if (!issued || !sig) return false;
  const expected = sign(issued);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return false;
  }
  const age = (Date.now() - Number(issued)) / 1000;
  if (!Number.isFinite(age) || age < 0 || age > MAX_AGE_SEC) return false;
  return true;
}

export function setAdminCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export function clearAdminCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function isAdmin() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
