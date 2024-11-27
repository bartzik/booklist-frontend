import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import api from "../services/api";

const AdminEditPublisherPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublisher = async () => {
      try {
        const response = await api.get(`/booklist/publishers/${id}`);
        setName(response.data.name);
      } catch (err) {
        setError("Erro ao carregar dados da editora.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublisher();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/booklist/publishers/${id}`, { name });
      setSuccess("Editora atualizada com sucesso!");
      setName('');
      setError(null);
    } catch (err) {
      setError("Erro ao atualizar a editora.");
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
      <h2>Editar Editora</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome da Editora</Form.Label>
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
          onClick={() => navigate("/admin/publishers")}
        >
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default AdminEditPublisherPage;
