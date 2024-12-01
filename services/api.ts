import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

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

api.defaults.headers.post["Content-Type"] = "application/json";


export default api;
