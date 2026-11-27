const BASE_URL = "/api";                       // ① the building's address, written once

async function request(path, { method, body } = {}) {
  let res;
  try {
    res = await fetch(BASE_URL + path, {      // address = "/api" + "/users/me"
      method,                                 //   what kind of request: GET, POST, PATCH, DELETE
      credentials: "include",                 //  attach the ID badge (login cookie)
      headers: body ? { "Content-Type": "application/json" } : undefined,  //  label: "this is JSON"
      body: body ? JSON.stringify(body) : undefined,                       //  pack: object → text
    });
  } catch {
    throw new Error("Can't reach the server. Is the backend running?");    //  nobody answered
  }

  const data = await res.json().catch(() => null);  //  open the reply: text → object

  if (!res.ok) {                                //  bad answer? (status 400–599)
    const error = new Error(data?.error || "Something went wrong"); // the server's reason
    error.status = res.status;                  //    e.g. 401 = not logged in
    error.details = data?.details;              //    e.g. { field: "username" } = which box to mark red
    throw error;                                //    hand the problem back to the screen
  }

  return data;                                  // ④ good answer: hand back the info
}

export const api = {                            // shortcuts so other files write less
  get:    (path)       => request(path, { method: "GET" }),
  post:   (path, body) => request(path, { method: "POST", body }),
  patch:  (path, body) => request(path, { method: "PATCH", body }),
  delete: (path)       => request(path, { method: "DELETE" }),
};