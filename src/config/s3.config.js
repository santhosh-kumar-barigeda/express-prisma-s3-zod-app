import { S3Client } from '@aws-sdk/client-s3';
import { STORAGE_ACCESS_KEY_ID, STORAGE_REGION, STORAGE_SECRET_ACCESS_KEY } from './env.config.js';

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: STORAGE_ACCESS_KEY_ID,
    secretAccessKey: STORAGE_SECRET_ACCESS_KEY,
  },
  region: STORAGE_REGION,
});
