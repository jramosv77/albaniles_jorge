export const API_URL = "http://localhost:1443/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

const apiFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then(handleResponse);
};



export const getUsers = () => apiFetch("/user");
export const getStudents = () => apiFetch("/student");