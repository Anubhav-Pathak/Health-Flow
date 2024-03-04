import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import { NextFunction, Request, Response } from 'express';
import { handleUploadUserReport } from './documents.service';

export const uploadUserReport = async (
  req: Request & {
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      throw {
        statusCode: ERRORS.MALFORMED_BODY.code,
        message: ERRORS.MALFORMED_BODY.message.error,
        description: ERRORS.MALFORMED_BODY.message.error_description,
      };
    }

    await handleUploadUserReport(req.body, req.file);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.IMAGE_UPLOAD,
    });
  } catch (error) {
    next(error);
  }
};
