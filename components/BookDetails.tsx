import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../services/api";

interface Review {
  id: string;
  comment: string;
  user: { name: string };
}

interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  publicationYear: number;
  summary: string | null;
  reviews: Review[];
  authors: Author[];
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/booklist/books/${id}`);
      setBook(response.data);
    } catch (error) {
      setError("Erro ao buscar dados do livro");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/booklist/reviews/${id}`);
      console.log("Avaliações recebidas:", response.data); // Verifique o conteúdo da resposta
      setReviews(response.data.reviews || response.data); 
        } catch (error) {
      setError("Erro ao buscar avaliações");
    }
  };
  

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("Você precisa estar logado para comentar.");
      return;
    }

    if (!comment.trim()) {
      setError("O comentário não pode estar vazio.");
      return;
    }

    try {
      const response = await api.post("/booklist/reviews", {
        comment,
        userId,
        bookId: id,
      });
      console.log("Resposta do servidor após adicionar comentário:", response.data);
      setSuccess("Comentário adicionado com sucesso!");
      setError(null);
      setComment("");
      fetchReviews(); // Atualiza as avaliações para incluir o novo comentário
    } catch {
      setError("Erro ao adicionar comentário. Tente novamente.");
      setSuccess(null);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!book) return <p>Livro não encontrado.</p>;

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p>Publicado em: {book.publicationYear}</p>
      <p>
        Autor(es):{" "}
        {book.authors && book.authors.length > 0
          ? book.authors.map((author) => author.name).join(", ")
          : "Autores não disponíveis"}
      </p>
      {book.summary ? <p>Resumo: {book.summary}</p> : <p>Resumo não disponível</p>}

      {/* Comentários */}
      <div className="mt-4">
        <h3>Avaliações</h3>
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="card p-3 mb-2">
                <h5>{review.userName || "Nome não disponível"}</h5>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma avaliação disponível</p>
          )}
        </div>
      </div>

      {/* Formulário de Comentário */}
      <div className="mt-4">
        <h5>Deixe um Comentário</h5>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group controlId="commentTextarea">
            <Form.Label>Comentário</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Digite seu comentário aqui..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Enviar Comentário
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default BookDetails;
