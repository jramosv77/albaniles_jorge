import { API_URL } from "./api"

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();
  const token = data.token;
 
  // Verificar que el token está en localStorage
  console.log("Token guardado en localStorage:", localStorage.getItem("token"));

  return token;
};

export const logout = () => {
  // lógica adicional de logout aquí
};

