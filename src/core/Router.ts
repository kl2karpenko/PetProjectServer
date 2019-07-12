import { Service } from 'typedi';
import { Router as RouterExpress } from 'express';
import bodyParser from 'body-parser';
// import logger from "../app";

@Service()
export default class Router {
  protected router: Router;

  constructor() {
    // All routers should call an init function from their constructor that sets up all of the routes.
    // This isn't enforced in any way but for routers that have many endpoints it helps to keep the constructor neat.
    this.router = RouterExpress();

    this.init();
  }

  public init() {
    this.router.use(bodyParser.json());
    this.router.use(
      bodyParser.urlencoded({
        limit: '2mb',
        extended: false,
      })
    );
  }
}
