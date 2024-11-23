// src/pages/PublisherCadastroPage.tsx
import React, { useState } from "react";
import api from "../services/api";
import { Form, Button, Container, Alert } from "react-bootstrap";

const PublisherCadastroPage: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/booklist/publishers", { name });
      if (response.status === 201) {
        setSuccess("Editora cadastrada com sucesso!");
        setError(null);
        setName(""); // Limpa o campo após o cadastro
      }
    } catch (error) {
      setError("Erro ao cadastrar a editora. Tente novamente.");
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center">Cadastro de Editora</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome da Editora</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome da Editora"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Cadastrar Editora
        </Button>
      </Form>
    </Container>
  );
};

export default PublisherCadastroPage;
