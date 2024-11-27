import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import api from "../services/api";

interface Author {
  id: string;
  name: string;
}

const AdminAuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = async () => {
    try {
      const response = await api.get("/booklist/authors");
      setAuthors(response.data);
    } catch (err) {
      setError("Erro ao carregar os autores.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este autor?")) {
      try {
        await api.delete(`/booklist/authors/${id}`);
        setAuthors(authors.filter((author) => author.id !== id));
      } catch (err) {
        setError("Erro ao excluir o autor.");
      }
    }
  };

  useEffect(() => {
    fetchAuthors();
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
      <h2 className="mb-4">Gerenciar Autores</h2>
      <Button
        className="mb-3"
        onClick={() => navigate("/author-cadastro")}
        variant="success"
      >
        Cadastrar Novo Autor
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/author-edit/${author.id}`)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(author.id)}
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

export default AdminAuthorsPage;
