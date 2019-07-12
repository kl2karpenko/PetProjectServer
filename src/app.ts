import createError from 'http-errors';
import { Router } from 'express';
import express, { Application, Request, Response, Errback } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import Router from './core/Router';
import { Error } from './core/types';
import { Service } from 'typedi';

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const loginRouter = require('./routes/login');

@Service()
class App {
  protected router: Router;
  public app = express();

  constructor() {
    this.create();
  }

  public createRoutes() {
    // this.router.use('/api/', indexRouter);
    // this.router.use('/api/users', usersRouter);
    // this.router.use('/api/login', loginRouter);
  }

  public create(): Application {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.app.use((req: Request, res: Response, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Auth-Token',
      );

      //intercepts OPTIONS method
      if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
      } else {
        //move on
        next();
      }
    });

    this.app.options('/*', (req: Request, res: Response, next: any): void => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Auth-Token',
      );
      res.send(200);
      next();
    });

    this.app.use((req: Request, res: Response, next: any): void => {
      next(createError(404));
    });

    this.router.use((err: Error, req: Request, res: Response): void => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err,
      });
    });

    return this.app;
  }
}

export default App;
