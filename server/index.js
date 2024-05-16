import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyCompress from "@fastify/compress";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { jwtverify } from "./hook/jwtverify.js";

dotenv.config();

const app = fastify({
  logger: true,
});

app.register(fastifyCors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "DELETE"],
});
app.register(fastifyCompress);
app.register(fastifyHelmet);

app.addHook("onRequest", jwtverify);
app.register(import("./routes/auth.js"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    try {
      await app.listen({ port: process.env.PORT || 4444 });
      console.log(`Server is running on ${app.server.address().port}`);
    } catch (err) {
      console.log(err);
    }
  })
  .catch((err) => console.log(err));
