import http from "./http";

export const api = {
  login(payload) {
    return http.post("/login", payload);
  },
  signup(payload) {
    return http.post("/signup", payload);
  },
  profile() {
    return http.get("/auth/user");
  },
  logout() {
    return http.get("/logout");
  },
  allNotes() {
    return http.get("/notes");
  },
};
