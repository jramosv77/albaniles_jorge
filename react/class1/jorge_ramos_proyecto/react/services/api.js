const API_URL = "http://localhost:1443/api" // Ajusta esto para que coincida con la URL de tu backend

const getToken = () => localStorage.getItem("token")

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Something went wrong")
  }
  return response.json()
}

const apiFetch = (url, options = {}) => {
  const token = getToken()
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then(handleResponse)
}

export const getUsers = () => apiFetch("/user")

export const getStudents = () => apiFetch("/student")

