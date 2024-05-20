// apiService.js
import axiosInstance, { axiosPrivate } from "./axios";

const apiService = {
  get: async (url, config = {}, isPrivate = false) => {
    try {
      const response = await (isPrivate ? axiosPrivate : axiosInstance).get(
        url,
        config
      );
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  post: async (url, data, config = {}, isPrivate = false) => {
    try {
      const response = await (isPrivate ? axiosPrivate : axiosInstance).post(
        url,
        data,
        config
      );
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  put: async (url, data, config = {}, isPrivate = false) => {
    try {
      const response = await (isPrivate ? axiosPrivate : axiosInstance).put(
        url,
        data,
        config
      );
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  delete: async (url, config = {}, isPrivate = false) => {
    try {
      const response = await (isPrivate ? axiosPrivate : axiosInstance).delete(
        url,
        config
      );
      return response;
    } catch (error) {
      handleError(error);
    }
  },
};

const handleError = (error) => {
  // Customize error handling based on your application's requirements
  console.error("API call error:", error);
  throw error;
};

export default apiService;
