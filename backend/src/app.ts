import express from 'express';
import UserRouter from './Routes/User.router';
import TestRouter from './Routes/Tests.router';
import CorrectionRouter from './Routes/Correction.router';
import validateToken from './Validation/tokenValidation';
import ErrorHandler from './Middlewares/ErrorHandler.middleware';
import cors from 'cors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }));

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/user', UserRouter);
    this.app.use('/test', TestRouter);
    this.app.use('/correction', CorrectionRouter);
    this.app.post('/token', validateToken, (_req, res) => {
      const { user } = res.locals;
      delete user.password;
      return res.status(202).json(user);
    });
    this.app.use(ErrorHandler.handle);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();