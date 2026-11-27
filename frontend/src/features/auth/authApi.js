import { api } from "../../shared/api/client";

export const register = (data) => api.post("/auth/register", data); // { username, email, password }
export const login    = (data) => api.post("/auth/login", data);    // { identifier, password }
export const logout   = ()     => api.post("/auth/logout");
export const getMe    = ()     => api.get("/users/me");