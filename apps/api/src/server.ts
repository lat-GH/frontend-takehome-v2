import express, { Request } from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import api from './api';

const allowList = ['http://localhost:3000', 'http://localhost:6006'];

const corsOptions: CorsOptionsDelegate<Request> = (req, cb) => {
  let options = { origin: false };
  const origin = req.header('Origin');

  if (origin && allowList.indexOf(origin) !== -1) {
    options.origin = true;
  }

  cb(null, options);
};

const server = (port: number): Promise<void> => {
  const app = express();
  app.use(cors(corsOptions));
  api(app);
  return new Promise((resolve) => {
    app.listen(port, () => {
      console.info(`Starting API on http://localhost:${port}`);
      resolve();
    });
  });
};

export default server;
