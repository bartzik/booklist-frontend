import React, { useState } from "react";
import api from "../services/api";
import { Form, Button, Container, Alert } from "react-bootstrap";

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Controla se a página mostra login ou cadastro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Apenas para o cadastro
  const [userType, setUserType] = useState("READER"); // Tipo de usuário para o cadastro
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Alterna entre os formulários de login e cadastro
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
  };

  // Função para o login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      console.log("Response data:", response.data);
  
      if (response.status === 200) {
        const { sessionId, userType, userId } = response.data;
  
        localStorage.setItem("sessionId", sessionId);
        localStorage.setItem("userType", userType);
        localStorage.setItem("userId", userId);
  
        // Redireciona com base no tipo de usuário
        if (userType === "ADMIN") {
          window.location.href = "/admin"; // Página do administrador
        } else {
          window.location.href = "/reader-dashboard"; // Página específica para leitores
        }
      }
    } catch {
      setError("Email ou senha incorretos.");
    }
  };
  

  // Função para o cadastro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
        tipo: userType, // Inclui o tipo de usuário no cadastro
      });
      if (response.status === 200) {
        setSuccess("Usuário registrado com sucesso! Redirecionando...");
        setError(null);

        // Salva o tipo de usuário e redireciona com base no tipo de usuário
        localStorage.setItem("userType", userType);

        // Simula um tempo de espera para exibir a mensagem de sucesso antes do redirecionamento
        setTimeout(() => {
          window.location.href = userType === "ADMIN" ? "/admin" : "/";
        }, 2000);
      }
    } catch {
      setError("Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center">{isLogin ? "Login" : "Cadastro"}</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Alterna entre os formulários de Login e Cadastro */}
      <div className="text-center mb-3">
        <Button variant="link" onClick={toggleForm}>
          {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
        </Button>
      </div>

      <Form onSubmit={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Usuário</Form.Label>
              <Form.Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="READER">Reader</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
          </>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          {isLogin ? "Entrar" : "Cadastrar"}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
