import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../config/env.config.js';
import { ApiError } from './responses.js';

export const generateAccessToken = (payload) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new ApiError(500, 'ACCESS_TOKEN_SECRET is not defined.');
  }

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (payload) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new ApiError(500, 'REFRESH_TOKEN_SECRET is not defined.');
  }

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const generateAccessAndRefreshTokens = (payload) => {
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const generateTokensForUser = (user) => {
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens({ id: user.id, email: user.email });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new ApiError(500, 'Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw new ApiError(401, 'Unauthorized', [], error.stack);
  }
};

export const verifyRefreshToken = (token) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new ApiError(500, 'Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw new ApiError(401, 'Unauthorized', [], error.stack);
  }
};
