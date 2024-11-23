// src/pages/AuthorCadastroPage.tsx
import React, { useState } from "react";
import api from "../services/api";
import { Form, Button, Container, Alert } from "react-bootstrap";

const AuthorCadastroPage: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/booklist/authors", { name });
      if (response.status === 201) {
        setSuccess("Autor cadastrado com sucesso!");
        setError(null);
        setName(""); // Limpa o campo após o cadastro
      }
    } catch (error) {
      setError("Erro ao cadastrar o autor. Tente novamente.");
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center">Cadastro de Autor</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do Autor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Cadastrar Autor
        </Button>
      </Form>
    </Container>
  );
};

export default AuthorCadastroPage;
