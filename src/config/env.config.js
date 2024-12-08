// Destructure environment variables
export const {
  // Storage Configuration
  STORAGE_BUCKET_NAME,
  STORAGE_REGION,
  STORAGE_ACCESS_KEY_ID,
  STORAGE_SECRET_ACCESS_KEY,

  DATABASE_URL,

  // Server Configuration
  PORT,
  CORS_ORIGIN,
  NODE_ENV,

  // Authentication Configuration
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

// List of required environment variables
const requiredEnvVariables = [
  'STORAGE_BUCKET_NAME',
  'STORAGE_REGION',
  'STORAGE_ACCESS_KEY_ID',
  'STORAGE_SECRET_ACCESS_KEY',
  'DATABASE_URL',
  'PORT',
  'CORS_ORIGIN',
  'NODE_ENV',
  'ACCESS_TOKEN_SECRET',
  'ACCESS_TOKEN_EXPIRES_IN',
  'REFRESH_TOKEN_SECRET',
  'REFRESH_TOKEN_EXPIRES_IN',
];

// Function to validate required environment variables
export const validateEnvVariables = () => {
  const missingVariables = requiredEnvVariables.filter((name) => !process.env[name]);

  if (missingVariables.length > 0) {
    console.error('❌ Missing Environment Variables:', missingVariables.join(', '));
    throw new Error('One or more required environment variables are not set.');
  }

  console.log('✅ All required environment variables are loaded.');
};
