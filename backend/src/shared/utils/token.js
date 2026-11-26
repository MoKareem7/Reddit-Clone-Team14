import jwt from "jsonwebtoken";

export function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.TOKEN_DAYS || 7}d`,
  });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET); // throws if missing, fake, edited or expired
}

// Get the token from the cookie (browser) or "Authorization: Bearer <token>" (Postman, tests)
export function getTokenFromRequest(req) {
  if (req.cookies?.token) return req.cookies.token;

  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}