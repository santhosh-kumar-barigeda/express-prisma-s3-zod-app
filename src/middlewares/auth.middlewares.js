import { getUserById } from '../services/user.services';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/responses.js';
import { verifyAccessToken } from '../utils/tokenUtils.js';

export const verifyAccessTokenMiddleware = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '') || req.body.accessToken;

  if (!accessToken) {
    throw new ApiError(401, 'Unauthorized');
  }

  const decoded = verifyAccessToken(accessToken);
  const user = await getUserById(decoded.id);

  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }

  req.user = user;

  next();
});
