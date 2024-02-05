import  express  from "express";
import cors from "cors";
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csurf from 'csurf';

import userRouter from "./routes/userRouter.js";
import accountRouter from "./routes/Account.routes.js"
import prerouter from "./routes/PreAccounts.routes.js";
import authRouter from "./routes/Auth.routes.js";

export const app = express();

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: {},
  }));

app.get('/', (_req , res) =>{
    res.send('<h1>Hola Backend</h1>')
})

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())

//CSRF PROTECTION
app.use(csurf({ cookie: true }));
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken()); // Send the CSRF token to the client
  return next();
});

// Error handler for CSRF token errors
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // Handle CSRF token errors here
  res.status(403);
  res.send('CSRF attack detected');
});


app.use("/cerberus/users", userRouter)
app.use("/cerberus/preaccounts", prerouter)
app.use("/cerberus/accounts", accountRouter)
app.use("/cerberus/auth", authRouter)
