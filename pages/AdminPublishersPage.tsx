import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Publisher {
  id: string;
  name: string;
}

const AdminPublishersPage: React.FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPublishers = async () => {
    try {
      const response = await api.get("/booklist/publishers");
      setPublishers(response.data);
    } catch (err) {
      setError("Erro ao carregar as editoras.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta editora?")) {
      try {
        await api.delete(`/booklist/publishers/${id}`);
        setPublishers(publishers.filter((publisher) => publisher.id !== id));
      } catch (err) {
        setError("Erro ao excluir a editora. Certifique-se de que não há livros associados.");
      }
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Gerenciar Editoras</h2>
      <Button
        className="mb-3"
        onClick={() => navigate("/publisher-cadastro")}
        variant="success"
      >
        Cadastrar Nova Editora
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher) => (
            <tr key={publisher.id}>
              <td>{publisher.name}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/publisher-edit/${publisher.id}`)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(publisher.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPublishersPage;
