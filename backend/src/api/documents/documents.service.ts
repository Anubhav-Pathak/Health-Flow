import config from '@/config';
import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import { promisify } from 'util';

const s3Client = new S3Client({
  region: config.AWS.region,
  credentials: {
    accessKeyId: config.AWS.clientKey,
    secretAccessKey: config.AWS.clientSecret,
  },
});

const S3_BASE_URL = `https://${config.AWS.bucketName}.s3.${config.AWS.region}.amazonaws.com`;

const removeFileAfterUse = async (path: fs.PathLike) => {
  try {
    const unlinkFile = promisify(fs.unlink);
    await unlinkFile(`./${path}`);
  } catch {
    throw {
      statusCode: ERRORS.SERVER_ERROR.code,
      message: `${ERRORS.SERVER_ERROR.message.error} | File Unlink Error`,
      description: ERRORS.SERVER_ERROR.message.error_description,
    };
  }
};

export const handleUploadUserReport = async (data, file: Express.Multer.File) => {
  const patientCollection = (await db()).collection('patients');

  const uploadResult = await s3Client.send(
    new PutObjectCommand({
      Bucket: config.AWS.bucketName,
      Key: file.filename,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
      // ACL: 'public-read',
    }),
  );

  await removeFileAfterUse(file.path);

  if (!uploadResult) {
    throw {
      statusCode: ERRORS.MALFORMED_BODY.code,
      message: ERRORS.MALFORMED_BODY.message.error,
      description: ERRORS.MALFORMED_BODY.message.error_description,
    };
  }

  const result = await patientCollection.insertOne({
    ...data,
    imageURL: `${S3_BASE_URL}/${file.filename}`,
  });

  if (result.acknowledged !== true) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
      description: ERRORS.RESOURCE_NOT_FOUND.message.error_description,
    };
  }
};
