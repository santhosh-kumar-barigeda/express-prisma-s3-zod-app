import multer from 'multer';
import { multerDiskStorage, multerMemoryStorage } from '../config/multer.config.js';
import { fileFilter } from '../utils/fileUtils.js';

// Middleware for Disk Storage Upload
export const uploadToDiskStorage = (destinationPath, allowedMimeTypes = []) => {
  return multer({
    storage: multerDiskStorage(destinationPath),
    fileFilter: allowedMimeTypes.length ? fileFilter(allowedMimeTypes) : undefined,
  });
};

// Middleware for Memory Storage Upload
export const uploadToMemoryStorage = (allowedMimeTypes = []) => {
  return multer({
    storage: multerMemoryStorage(),
    fileFilter: allowedMimeTypes.length ? fileFilter(allowedMimeTypes) : undefined,
  });
};
