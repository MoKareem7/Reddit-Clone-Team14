import * as authService from "./auth.service.js";

const COOKIE_NAME = "token";

// A function (not a plain object) so .env is read when a request comes in,
// after dotenv has definitely loaded it.
function cookieOptions() {
  const days = Number(process.env.TOKEN_DAYS) || 7; // same as the JWT expiry in token.js
  return {
    httpOnly: true, // page JavaScript can't read it
    sameSite: "lax", // not sent with hidden cross-site POSTs
    secure: process.env.NODE_ENV === "production", // HTTPS only when deployed
    path: "/",
    maxAge: days * 24 * 60 * 60 * 1000, // milliseconds
  };
}

// POST /api/auth/register   body: { username, email, password }
export async function register(req, res) {
  const { user, token } = await authService.register(req.body);
  res.cookie(COOKIE_NAME, token, cookieOptions());
  res.status(201).json({ user });
}

// POST /api/auth/login   body: { identifier, password }
export async function login(req, res) {
  const { user, token } = await authService.login(req.body);
  res.cookie(COOKIE_NAME, token, cookieOptions());
  res.json({ user });
}

// POST /api/auth/logout
export async function logout(req, res) {
  const { maxAge, ...clearOptions } = cookieOptions(); // same options, without maxAge
  res.clearCookie(COOKIE_NAME, clearOptions);
  res.json({ message: "Logged out" });
}