import { createResource, getResources, getSingleResource, updateResource, deleteResource } from './db.services.js';

const resourceName = 'user';

// Create a new user
export const createUser = async (userData) => {
  return await createResource(resourceName, userData);
};

// Get all users with optional filters
export const getAllUsers = async (filters = {}) => {
  return await getResources(resourceName, { where: filters });
};

// Get a single user by ID
export const getUserById = async (id) => {
  return await getSingleResource(resourceName, 'id', id);
};

// Get a single user by Email
export const getUserByEmail = async (email) => {
  return await getSingleResource(resourceName, 'email', email);
};

// Update user details by ID
export const updateUser = async (id, updatedData) => {
  return await updateResource(resourceName, id, updatedData);
};

// Delete a user by ID
export const deleteUser = async (id) => {
  return await deleteResource(resourceName, id);
};
