import React, { useState, useEffect } from "react";
import { Button, Carousel, Card, Spinner } from "react-bootstrap";
import api from "../services/api";

const Home: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await api.get("/booklist/books");
        setFeaturedBooks(response.data.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar livros em destaque:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      {/* Cabeçalho */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">Explore, Avalie e Compartilhe</h1>
        <p className="lead text-muted">
          Um lugar onde leitores e livros se encontram.
        </p>
        <div>
          <Button href="/books" variant="primary" size="lg" className="me-3">
            Explore os Livros
          </Button>
          <Button href="/login" variant="outline-secondary" size="lg">
            Faça Parte
          </Button>
        </div>
      </header>

      {/* Carrossel de Livros em Destaque */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Livros em Destaque</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Carousel>
            {featuredBooks.map((book) => (
              <Carousel.Item key={book.id}>
                <img
                  className="d-block w-100"
                  src={
                    book.photoUrl
                      ? `http://localhost:8080${book.photoUrl}`
                      : "https://via.placeholder.com/800x400?text=Sem+Capa"
                  }
                  alt={`Capa de ${book.title}`}
                  style={{ objectFit: "cover", height: "400px" }}
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
                  <h3>{book.title}</h3>
                  <p>{book.summary || "Descrição não disponível"}</p>
                  <Button href={`/books/${book.id}`} variant="light" size="sm">
                    Ver Detalhes
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </section>

      {/* Categorias ou Destaques */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Descubra</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {[
            {
              title: "Mais Avaliados",
              text: "Descubra os livros mais bem avaliados pelos leitores.",
            },
            {
              title: "Novidades",
              text: "Confira os livros recém-adicionados à nossa coleção.",
            },
            {
              title: "Autores Famosos",
              text: "Explore as obras dos autores mais renomados.",
            },
          ].map((item, index) => (
            <div className="col" key={index}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                  <Button href="/books" variant="primary">
                    Ver Mais
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section
        className="text-center mb-5"
        style={{
          padding: "40px 20px",
          background: "linear-gradient(135deg, #f8f9fa, #e2e6ea)",
          borderRadius: "10px",
        }}
      >
        <h2 className="mb-4" style={{ fontWeight: "bold", fontSize: "2rem" }}>
          O que nossos leitores dizem
        </h2>
        <Carousel indicators={false} interval={5000}>
          {[
            {
              text: "O BookList transformou minha forma de escolher livros. Agora, eu sempre tenho boas recomendações!",
              author: "Ana",
            },
            {
              text: "Uma comunidade incrível para compartilhar opiniões sobre literatura. Super recomendo!",
              author: "João",
            },
          ].map((testimonial, index) => (
            <Carousel.Item key={index}>
              <blockquote
                className="blockquote"
                style={{
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  color: "#555",
                  margin: "0 auto",
                  maxWidth: "600px",
                }}
              >
                <p className="mb-4">"{testimonial.text}"</p>
                <footer
                  className="blockquote-footer"
                  style={{
                    fontSize: "1rem",
                    marginTop: "1rem",
                    color: "#6c757d",
                  }}
                >
                  <cite>{testimonial.author}</cite>
                </footer>
              </blockquote>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default Home;
