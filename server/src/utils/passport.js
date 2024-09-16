const { loginUser, findUserById } = require("../services/user.js");

const LocalStrategy = require("passport-local").Strategy;

const initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await loginUser(email);

          if (user == null) return done(new Error("User is Null"));
          if (user.password != password)
            return done(null, false, { message: "Password incorrect" });

          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          return done(null, false, { message: "USER DOES NOT EXISTS" });
        }
      }
    )
  );
  passport.serializeUser(async (user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (userid, done) => {
    try {
      const user = await findUserById(userid);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

module.exports = { initializePassport, isAuth };
// try {
//     const loginData = {
//       email: req.body.email,
//       password: req.body.password,
//     };
//     const addeddata = await loginUser(loginData);
//     console.log(addeddata);
//     if (addeddata == -1) {
//       res.status(200).json({ userid: addeddata });
//     } else {
//       res.status(201).json({ userid: addeddata });
//     }
//   } catch (error) {
//     res.status(500).send(error.msg);
//   }

//initializePassport(passport);
//app.use(flash());
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
