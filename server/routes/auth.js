import {
  postLogin,
  postSignUp,
  test,
  getProfile,
  deleteProfile,
} from "../controllers/auth.js";

async function routes(fastify, options) {
  // Post method
  fastify.post("/login", postLogin);
  fastify.post("/register", postSignUp);

  // Get method
  fastify.get("/profile", getProfile);
  fastify.get("/test", test);

  // delete method
  fastify.delete("/delete", deleteProfile);
}

export default routes;
