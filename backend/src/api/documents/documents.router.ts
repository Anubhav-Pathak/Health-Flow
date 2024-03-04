import { upload } from '@/shared/middlewares/multer';
import { Router } from 'express';
import { uploadUserReport } from './documents.controller';

export default (): Router => {
  const app = Router();

  app.post('/report', upload.single('image'), uploadUserReport);

  return app;
};
