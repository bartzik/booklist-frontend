// src/pages/BookCadastroPage.tsx
import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../services/api";
import { Form, Button, Container, Alert } from "react-bootstrap";

interface Publisher {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string;
}

const BookCadastroPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [publicationYear, setPublicationYear] = useState<number | undefined>(undefined);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  // Carregar editoras e autores do backend
  useEffect(() => {
    const fetchPublishersAndAuthors = async () => {
      try {
        const publishersResponse = await api.get("/booklist/publishers");
        setPublishers(publishersResponse.data);

        const authorsResponse = await api.get("/booklist/authors");
        setAuthors(authorsResponse.data);
      } catch (error) {
        setError("Erro ao carregar editoras e autores.");
      }
    };
    fetchPublishersAndAuthors();
  }, []);

  // Função para enviar o formulário de cadastro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/booklist/books", {
        title,
        publicationYear,
        publisherId: selectedPublisher?.id,
        authorIds: selectedAuthors.map((author) => author.id),
      });
      if (response.status === 201) {
        setSuccess("Livro cadastrado com sucesso!");
        setError(null);
        // Limpa os campos após o sucesso
        setTitle("");
        setPublicationYear(undefined);
        setSelectedPublisher(null);
        setSelectedAuthors([]);
      }
    } catch (error) {
      setError("Erro ao cadastrar o livro. Tente novamente.");
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center">Cadastro de Livro</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título do Livro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ano de Publicação</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ano de Publicação"
            value={publicationYear || ""}
            onChange={(e) => setPublicationYear(Number(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Editora</Form.Label>
          <Select
            options={publishers.map((publisher) => ({ value: publisher.id, label: publisher.name }))}
            value={selectedPublisher ? { value: selectedPublisher.id, label: selectedPublisher.name } : null}
            onChange={(option) => setSelectedPublisher(publishers.find(p => p.id === option?.value) || null)}
            placeholder="Selecione uma Editora"
            isClearable
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Autores</Form.Label>
          <Select
            options={authors.map((author) => ({ value: author.id, label: author.name }))}
            value={selectedAuthors.map((author) => ({ value: author.id, label: author.name }))}
            onChange={(options) => setSelectedAuthors(options.map((option) => authors.find(a => a.id === option.value)!))}
            placeholder="Selecione um ou mais Autores"
            isMulti
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Cadastrar Livro
        </Button>
      </Form>
    </Container>
  );
};

export default BookCadastroPage;