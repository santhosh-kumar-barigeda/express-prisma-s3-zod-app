import { NODE_ENV } from '../config/env.config.js';
import { ApiError } from '../utils/responses.js';
import { Prisma } from '@prisma/client';

export const errorMiddleware = async (err, req, res, next) => {
  let error = err;

  // Handle non-ApiError instances
  if (!(error instanceof ApiError)) {
    // Prisma error handling
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma known errors
      const message = `Prisma error: ${err.message}`;
      const statusCode = 400;
      error = new ApiError(statusCode, message, [err.meta || {}], err.stack);
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      const message = 'Unknown Prisma error occurred!';
      error = new ApiError(500, message, [], err.stack);
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
      const message = 'Prisma initialization error occurred!';
      error = new ApiError(500, message, [], err.stack);
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      const message = `Validation error: ${err.message}`;
      error = new ApiError(400, message, [err.meta || {}], err.stack);
    } else {
      // Generic errors
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Something went wrong!';
      error = new ApiError(statusCode, message, err?.errors || [], err.stack);
    }
  }

  // Format the response
  const response = {
    ...error,
    message: error.message,
    ...(NODE_ENV === 'development' ? { stack: error.stack } : {}),
  };

  // Log the error
  console.error('Error:', err.message || err);

  // Send the response
  return res.status(error.statusCode).json(response);
};
