import { Router } from "express";
import * as controller from "./users.controller.js";
import { requireAuth } from "../../shared/middleware/requireAuth.js";

const router = Router();

// "/me" routes MUST come before "/:id", otherwise Express treats "me" as an id
router.get("/me", requireAuth, controller.getMe);       // GET   /api/users/me   → who am I? (logged in only)
router.patch("/me", requireAuth, controller.updateMe);  // PATCH /api/users/me   → edit my bio/avatar (logged in only)

router.get("/:id", controller.getUser);                 // GET   /api/users/:id  → view anyone's profile (public)

export default router;