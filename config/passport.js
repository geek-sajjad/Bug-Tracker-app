const LocalStrategy = require('passport-local').Strategy;
const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const foundedUser = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!foundedUser) {
        return done(null, false);
      }

      done(null, foundedUser);
    } catch (error) {
      console.log(error);
      done(error);
    }
  });

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      async (req, email, password, done) => {
        try {
          let user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
          // check to see if theres already a user with that email
          if (user) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'That email is already taken.')
            );
          }
          // if there is no user with that email
          // create the user
          const hashedPassword = await bcrypt.hash(password, 10);
          const { name } = req.body;
          user = await prisma.user.create({
            data: {
              email: email,
              hashedPassword: hashedPassword,
              name: name,
            },
          });
          done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
          if (!user) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'email or password is wrong')
            );
          }
          const result = await bcrypt.compare(password, user.hashedPassword);
          if (!result) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'email or password is wrong')
            );
          }
          done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};
