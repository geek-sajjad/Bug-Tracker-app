require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const hpp = require('hpp');
const prisma = require('./utils/prisma');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const websiteRoutes = require('./routes/website');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api/v1/index');
const error = require('./controllers/error');
const authMiddleware = require('./middlewares/auth');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const passportConfig = require('./config/passport');
const morgan = require('morgan');

const csrfProtection = csrf();
const app = express();
const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(morgan('dev'))
app.use(helmet());
app.use(express.json());
app.use('/api/v1', apiRoutes);
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrfProtection);
app.use(hpp());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

passportConfig(passport);
app.use(passport.session())
app.use(passport.initialize())
app.use(flash());

app.use(authRoutes);
app.use(websiteRoutes);
app.use('/dashboard', authMiddleware, dashboardRoutes);
app.use(error.get404);
app.use(error.get500);

app.listen(3000, () =>
  console.log('🚀 Server ready at: http://localhost:3000')
);
