import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { nanoid } from 'nanoid';
import { s3Client } from '../config/s3.config.js';
import { STORAGE_BUCKET_NAME, STORAGE_REGION } from '../config/env.config.js';

export const uploadFileToS3 = async (file, isPublic = false) => {
  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const key = `jira/uploads/${nanoid()}`;
    const command = new PutObjectCommand({
      Bucket: STORAGE_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ...(isPublic && { ACL: 'public-read' }),
    });

    await s3Client.send(command);

    return isPublic ? { url: `https://${STORAGE_BUCKET_NAME}.s3.${STORAGE_REGION}.amazonaws.com/${key}`, key } : { key };
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

export const uploadFileToS3Public = (file) => uploadFileToS3(file, true);

export const uploadFileToS3Private = (file) => uploadFileToS3(file);

export const deleteS3File = async (key) => {
  try {
    await s3Client.send(new DeleteObjectCommand({ Bucket: STORAGE_BUCKET_NAME, Key: key }));
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
};

export const deleteS3FileByKey = deleteS3File;

export const deleteS3FileByUrl = async (url) => {
  try {
    const key = url.split('amazonaws.com/')[1];
    await deleteS3File(key);
  } catch (error) {
    console.error('Error deleting file by URL:', error);
    throw error;
  }
};

export const getSignedUrlForS3File = async (key) => {
  try {
    return await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: STORAGE_BUCKET_NAME, Key: key }), { expiresIn: 3600 });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};
