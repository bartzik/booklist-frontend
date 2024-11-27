import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import api from "../services/api";

const AdminEditAuthorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await api.get(`/booklist/authors/${id}`);
        setName(response.data.name);
      } catch (err) {
        setError("Erro ao carregar os dados do autor.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/booklist/authors/${id}`, { name });
      setSuccess("Autor atualizado com sucesso!");
      setError(null);
    } catch (err) {
      setError("Erro ao atualizar o autor.");
      setSuccess(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2>Editar Autor</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Autor</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Salvar Alterações
        </Button>
        <Button
          variant="secondary"
          className="ms-3"
          onClick={() => navigate("/admin/authors")}
        >
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default AdminEditAuthorPage;
