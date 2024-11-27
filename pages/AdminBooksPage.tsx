import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Book {
  id: string;
  title: string;
  publicationYear: number;
  summary: string | null;
  photoUrl?: string;
}

const AdminBooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await api.get("/booklist/books");
      setBooks(response.data);
    } catch (err) {
      setError("Erro ao carregar os livros.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      try {
        await api.delete(`/booklist/books/${id}`);
        setBooks(books.filter((book) => book.id !== id));
      } catch (err) {
        setError("Erro ao excluir o livro.");
      }
    }
  };

  useEffect(() => {
    fetchBooks();
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
      <h2 className="mb-4">Gerenciar Livros</h2>
      <Button
        className="mb-3"
        onClick={() => navigate("/book-cadastro")}
        variant="success"
      >
        Cadastrar Novo Livro
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título</th>
            <th>Ano de Publicação</th>
            <th>Resumo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                {book.photoUrl && (
                  <img
                    src={`http://localhost:8080${book.photoUrl}`}
                    alt={`Capa de ${book.title}`}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>{book.title}</td>
              <td>{book.publicationYear}</td>
              <td>{book.summary?.substring(0, 100)}...</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/admin/book-edit/${book.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDelete(book.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminBooksPage;
