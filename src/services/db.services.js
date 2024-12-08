import { prisma } from '../config/prisma.config.js';

const validateResource = (resourceName) => {
  if (!prisma[resourceName]) {
    throw new Error(`Resource "${resourceName}" is not defined in Prisma schema.`);
  }
};

export const createResource = async (resourceName, data) => {
  try {
    validateResource(resourceName);
    return await prisma[resourceName].create({ data });
  } catch (error) {
    console.error(`Error creating resource "${resourceName}":`, error.message);
    throw error;
  }
};

export const getResources = async (resourceName, queryOptions = {}) => {
  try {
    validateResource(resourceName);
    return await prisma[resourceName].findMany(queryOptions);
  } catch (error) {
    console.error(`Error fetching resources from "${resourceName}":`, error.message);
    throw error;
  }
};

export const getSingleResource = async (resourceName, uniqueField, value, queryOptions = {}) => {
  try {
    validateResource(resourceName);
    return await prisma[resourceName].findUnique({
      where: { [uniqueField]: value },
      ...queryOptions,
    });
  } catch (error) {
    console.error(`Error fetching resource "${resourceName}" with ${uniqueField}=${value}:`, error.message);
    throw error;
  }
};

export const updateResource = async (resourceName, id, data) => {
  try {
    validateResource(resourceName);
    return await prisma[resourceName].update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Error updating resource "${resourceName}" with ID ${id}:`, error.message);
    throw error;
  }
};

export const deleteResource = async (resourceName, id) => {
  try {
    validateResource(resourceName);
    return await prisma[resourceName].delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting resource "${resourceName}" with ID ${id}:`, error.message);
    throw error;
  }
};
