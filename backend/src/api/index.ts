import { Router } from 'express';
import documentsRouter from './documents/documents.router';

export default (): Router => {
  const app = Router();

  app.use('/upload', documentsRouter());

  return app;
};
