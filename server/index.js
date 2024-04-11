const fastify = require("fastify");
const dotenv = require("dotenv");
const cors = require("@fastify/cors");
const helmet = require("@fastify/helmet");
const compress = require("@fastify/compress");
const session = require("@fastify/session");
const fastifyCookie = require("@fastify/cookie");
const { Authenticator } = require("@fastify/passport");

dotenv.config();
const server = fastify({
  logger: true,
});
const fastifyPassport = new Authenticator();

server.register(cors);
server.register(helmet);
server.register(compress);
server.register(fastifyCookie);
server.register(session, {
  secret: "sajdasdasbdaskfbabfiabdbsjkbdkjsbjbdkjsbdjsbjdbkjsbkds",
  saveUninitialized: true,
});

// require('./passport/passport');
server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());

// server.register(require("./routes/index"));

// server.post('/login', passport.authenticate('local',
//     {
//         failureRedirect: '/login',
//         successRedirect: '/profile'
//     }))

// server.use('/', require('./routes/user'));

try {
  server.listen({ port: process.env.PORT || 3000 });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
