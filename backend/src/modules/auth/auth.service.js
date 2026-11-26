import bcrypt from "bcrypt";
import User from "../users/user.model.js";
import { AppError } from "../../shared/utils/AppError.js";
import { createToken } from "../../shared/utils/token.js";

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;

export async function register({ username, email, password } = {}) {
  // 1. All fields must be present
  if (!username || !email || !password) {
    throw new AppError(400, "Username, email and password are required");
  }

  // 2. Password must be text and long enough
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    throw new AppError(400, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`, { field: "password" });
  }

  // Clean up the input (remove spaces, lowercase the email)
  const cleanUsername = String(username).trim();
  const cleanEmail = String(email).trim().toLowerCase();

  // 3. Username must not be taken
  const usernameTaken = await User.exists({ username: cleanUsername });
  if (usernameTaken) {
    throw new AppError(409, "That username is already taken", { field: "username" });
  }

  // 4. Email must not be taken
  const emailTaken = await User.exists({ email: cleanEmail });
  if (emailTaken) {
    throw new AppError(409, "That email is already registered", { field: "email" });
  }

  // 5. Hash the password (never store the real one)
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // 6. Save the user
  const user = await User.create({ username: cleanUsername, email: cleanEmail, passwordHash });

  // 7. Return the user and a login token
  return { user, token: createToken(user._id) };
}

export async function login({ identifier, password } = {}) {
  // 1. Both fields must be present
  if (!identifier || !password) {
    throw new AppError(400, "Username/email and password are required");
  }

  // 2. Find the user by email (has "@") or username
  const value = String(identifier).trim();
  const query = value.includes("@")
    ? { email: value.toLowerCase() }
    : { username: value };

  const user = await User.findOne(query).select("+passwordHash");

  // 3. Check the password against the saved hash
  const ok = user && (await bcrypt.compare(String(password), user.passwordHash));

  // 4. Same message for "no such user" and "wrong password"
  if (!ok) {
    throw new AppError(401, "Invalid username or password");
  }

  // 5. Return the user and a login token
  return { user, token: createToken(user._id) };
}