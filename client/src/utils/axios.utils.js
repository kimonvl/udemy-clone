import axios from "axios";

export const sendAxiosPostJson = async (endpoint, data = {}) => {
    return await axios.post(`http://localhost:3000/${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
}

export const sendAxiosPostFormData = async (endpoint, formdata = {}) => {
    return await axios.post(`http://localhost:3000/${endpoint}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
}

export const sendAxiosGet = async (endpoint, params = {}) => {
  return await axios.get(`http://localhost:3000/${endpoint}`, {
      headers: {
          'Content-Type': 'application/json'
      },
      params, // Pass the params here
      withCredentials: true
  });
};