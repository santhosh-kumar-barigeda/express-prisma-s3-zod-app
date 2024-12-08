import multer from 'multer';
import { generateUniqueFileName } from '../utils/fileUtils.js';

// Multer Disk Storage
export const multerDiskStorage = (destinationPath = './public/temp') => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      cb(null, generateUniqueFileName(file));
    },
  });
};

// Multer Memory Storage
export const multerMemoryStorage = () => {
  return multer.memoryStorage();
};
