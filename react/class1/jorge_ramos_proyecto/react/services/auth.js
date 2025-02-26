import { API_URL } from "./api"

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  const data = await response.json()
  return data.token
}

export const logout = () => {
  // Puedes agregar aquí cualquier lógica adicional de logout si es necesario
  // Por ejemplo, podrías querer invalidar el token en el servidor
}

