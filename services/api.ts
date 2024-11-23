// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor para adicionar o sessionId em cada requisição
/**
api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('sessionId'); // Obtém o sessionId do localStorage
  if (sessionId) {
    config.headers.Authorization = sessionId; // Adiciona o sessionId no cabeçalho
  }
  return config;
});
**/

// Configura o interceptor para adicionar o sessionId no cabeçalho Authorization
api.interceptors.request.use(
  (config) => {
    // Pega o usuário do localStorage, caso esteja armazenado após o login
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Se o usuário está logado e a URL não é para login, adiciona o sessionId no cabeçalho
    if (user && user.sessionId && !config.url?.includes("/login")) {
      config.headers["Authorization"] = user.sessionId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
