import axios from "axios";

const API_URL = "http://localhost:8000";

export const login = (email, password) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};

export const signup = (firstName, lastName, email, password, phone) => {
  return axios.post(`${API_URL}/users/signup`, {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    phone
  });
};
