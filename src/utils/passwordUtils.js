import bcryptjs from 'bcryptjs';

export const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password cannot be empty.');
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error('Both password and hashedPassword are required.');
  }

  const isMatch = await bcryptjs.compare(password, hashedPassword);

  return isMatch;
};
