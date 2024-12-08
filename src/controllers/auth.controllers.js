import { asyncHandler } from '../utils/asyncHandler.js';
import { signUpSchema } from '../validations/auth.validations.js';
import { signUpService, signInService } from '../services/user.services.js';
import { ApiError, ApiResponse, removeCookies, setCookies } from '../utils/responses.js';
import { refreshAccessTokenService } from '../services/auth.services.js';

export const signUpController = asyncHandler(async (req, res, next) => {
  const { name, email, password } = signUpSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await signUpService(name, email, password);
  setCookies(res, accessToken, refreshToken);
  res.status(201).json(new ApiResponse(201, { user }, 'User signed up successfully'));
});

export const signInController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await signInService(email, password);
  setCookies(res, accessToken, refreshToken);
  res.status(200).json(new ApiResponse(200, { user }, 'Sign-in successful'));
});

export const signOutController = asyncHandler(async (req, res, next) => {
  removeCookies(res);
  res.status(200).json(new ApiResponse(200, {}, 'Sign-out successful'));
});

export const refreshAccessTokenController = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  const { user, accessToken, newRefreshToken } = await refreshAccessTokenService(refreshToken);
  setCookies(res, accessToken, newRefreshToken);
  res.status(200).json(new ApiResponse(200, { user }, 'Token refresh successful'));
});

export const getCurrentUserController = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) throw new ApiError(401, 'Unauthorized');

  res.status(200).json(new ApiResponse(200, { user }, 'Success'));
});
