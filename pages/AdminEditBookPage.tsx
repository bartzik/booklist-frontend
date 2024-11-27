import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import api from "../services/api";

interface Author {
  id: string;
  name: string;
}

interface Publisher {
  id: string;
  name: string;
}

const AdminEditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<number>(
    new Date().getFullYear()
  );
  const [summary, setSummary] = useState<string>("");
  const [authorIds, setAuthorIds] = useState<string[]>([]);
  const [publisherId, setPublisherId] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [photo, setPhoto] = useState<File | null>(null); // Estado para armazenar a foto
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await api.get(`/booklist/books/${id}`);
        const { title, publicationYear, summary, authors, publisher, photoUrl } =
          bookResponse.data;
        setTitle(title);
        setPublicationYear(publicationYear);
        setSummary(summary || "");
        setAuthorIds(authors.map((author: Author) => author.id));
        setPublisherId(publisher?.id || "");
        if (photoUrl) {
          setPhoto(null); // Mantém nulo, pois não carregamos a foto para edição
        }

        const authorsResponse = await api.get("/booklist/authors");
        setAuthors(authorsResponse.data);

        const publishersResponse = await api.get("/booklist/publishers");
        setPublishers(publishersResponse.data);
      } catch (err) {
        setError("Erro ao carregar os dados do livro.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validação do campo publisherId
    if (!publisherId) {
      setError("Por favor, selecione uma editora.");
      return;
    }
  
    try {
      // Cria o FormData para enviar os dados com a foto
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publicationYear", publicationYear.toString());
      formData.append("summary", summary);
  
      // Verifica se o campo de editora foi alterado
      formData.append("publisherId", publisherId); // Usa o valor atual de publisherId
  
      authorIds.forEach((authorId) =>
        formData.append("authorIds", authorId)
      );
  
      if (photo) {
        formData.append("photo", photo); // Adiciona a foto se foi alterada
      }
  
      await api.put(`/booklist/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Define o tipo do conteúdo
        },
      });
      setSuccess("Livro atualizado com sucesso!");
      setError(null);
    } catch (err) {
      setError("Erro ao atualizar o livro.");
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
      <h2>Editar Livro</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ano de Publicação</Form.Label>
          <Form.Control
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(Number(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Resumo</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Autores</Form.Label>
          <Form.Select
            multiple
            value={authorIds}
            onChange={(e) =>
              setAuthorIds(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            required
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Editora</Form.Label>
          <Form.Select
            value={publisherId}
            onChange={(e) => setPublisherId(e.target.value)}
            required
          >
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="photoUpload" className="mb-3">
          <Form.Label>Atualizar Foto do Livro</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) =>
              setPhoto(e.target.files ? e.target.files[0] : null)
            }
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Salvar Alterações
        </Button>
        <Button
          variant="secondary"
          className="ms-3"
          onClick={() => navigate("/admin/books")}
        >
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default AdminEditBookPage;
