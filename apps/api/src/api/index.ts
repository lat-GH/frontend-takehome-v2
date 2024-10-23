import express, { Express } from 'express';
import { requests as departmentRequests } from '../departments';

const api = (app: Express) => {
  const api = express.Router();
  departmentRequests(api);
  app.use('/api', api);
};

export default api;
