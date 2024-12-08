import { getUserByEmail, createUser, updateUser, getUserById } from './user.services.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { generateTokensForUser, verifyRefreshToken } from '../utils/tokenUtils.js';
import { ApiError } from '../utils/responses.js';

export const signUpService = async (name, email, password) => {
  // Check if the user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new ApiError(409, 'A user with this email already exists.');
  }

  // Hash the password and create the user
  const hashedPassword = await hashPassword(password);
  const newUser = await createUser({ name, email, password: hashedPassword });

  // Generate and store tokens
  const { accessToken, refreshToken } = generateTokensForUser(newUser);
  await updateUser(newUser.id, { refreshToken });

  // Exclude password from the response
  const { password: _, ...otherUserData } = newUser;

  return { user: otherUserData, accessToken, refreshToken };
};

export const signInService = async (email, password) => {
  // Validate user existence
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  // Validate password
  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  // Generate and store tokens
  const { accessToken, refreshToken } = generateTokensForUser(user);
  await updateUser(user.id, { refreshToken });

  // Exclude password from the response
  const { password: _, ...otherUserData } = user;

  return { user: otherUserData, accessToken, refreshToken };
};

export const refreshAccessTokenService = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(400, 'Refresh token is required.');
  }

  // Verify token and find user
  const decoded = verifyRefreshToken(incomingRefreshToken);
  const user = await getUserById(decoded.id);

  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(403, 'Invalid or expired refresh token.');
  }

  // Generate new tokens
  const { accessToken, refreshToken } = generateTokensForUser(user);
  await updateUser(user.id, { refreshToken });

  // Exclude password from the response
  const { password: _, ...otherUserData } = user;

  return { user: otherUserData, accessToken, refreshToken };
};
