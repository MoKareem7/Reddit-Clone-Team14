import { Router } from "express";
import * as controller from "./auth.controller.js";
// import { requireAuth } from "../../shared/middleware/requireAuth.js"; // uncomment once requireAuth.js is written

const router = Router();

// Public: anyone can register or log in
router.post("/register", controller.register); // POST /api/auth/register
router.post("/login", controller.login);       // POST /api/auth/login

// Logged-in users only (add requireAuth once it exists)
router.post("/logout", controller.logout);     // POST /api/auth/logout
// router.post("/logout", requireAuth, controller.logout);

export default router;

