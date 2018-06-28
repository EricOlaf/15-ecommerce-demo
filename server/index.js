require("dotenv").config();
const express = require("express"),
  { json } = require("body-parser"),
  massive = require("massive"),
  {
    CONNECTION_STRING,
    SECRET,
    SESSION_SECRET,
    CLIENT_ID,
    CLIENT_SECRET,
    PORT = 3001,
    DOMAIN
  } = process.env,
  session = require("express-session"),
  passport = require("passport"),
  AuthStrategy = require("passport-auth0"),
  app = express(),
  routes = require("./routes");

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.use(json());
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new AuthStrategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid email profile"
    },
    (_, __, ___, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(user));
passport.deserializeUser((user, done) => done(user));

app.get("/login", (req, res, next) => {
  passport.authenticate("auth0", (err, user, info) => {
    const db = req.app.get("db");
    db.customer.find({ auth_id: user.id }).then(([dbUser]) => {
      console.log("dbUser: ", dbUser);
      if (!dbUser) {
        db.customer
          .insert({
            first_name: user.name.givenName,
            last_name: user.name.familyName,
            email: user.emails[0].value,
            session_id: req.session.id,
            auth_id: user.id
          })
          .then(newUser => {
            req.session.user = newUser;
            return res.redirect(`${process.env.REACT_APP_DEV_HOST}`);
          });
      } else {
        req.session.user = dbUser;
        return res.redirect(`${process.env.REACT_APP_DEV_HOST}`);
      }
    });
  })(req, res, next);
});

routes(app);
app.get("/auth", (req, res) => {
  // console.log("Successfully logged in", req.session.user);
});
app.get("/fail", (req, res) => {
  console.log("Unsuccessfully logged in");
});

app.listen(PORT, console.log(`Listening @ ${PORT}`));
