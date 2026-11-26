import * as usersService from "./users.service.js";

// GET /api/users/me   (requireAuth runs first)
// Who is logged in? The frontend calls this when the page loads.
export async function getMe(req, res) {
  res.json({ user: req.user });
}

// GET /api/users/:id   (public)
// View anyone's profile. :id can be a user id or a username.
export async function getUser(req, res) {
  const user = await usersService.getById(req.params.id);
  res.json({ user });
}

// PATCH /api/users/me   (requireAuth runs first)
// Edit your own profile. body: { bio?, avatarUrl? }
export async function updateMe(req, res) {
  const user = await usersService.updateProfile(req.user._id, req.body);
  res.json({ user });
}