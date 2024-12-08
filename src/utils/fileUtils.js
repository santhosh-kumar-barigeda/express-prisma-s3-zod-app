import { nanoid } from 'nanoid';
import path from 'path';

// Utility to generate unique filenames
export const generateUniqueFileName = (file) => {
  const uniqueSuffix = `${Date.now()}-${nanoid()}`;
  const fileExtension = path.extname(file.originalname);
  return `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
};

// File Filter for Uploads
export const fileFilter = (allowedMimeTypes) => {
  return (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed.`), false);
    }
  };
};
