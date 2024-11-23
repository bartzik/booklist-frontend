import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

interface Review {
  id: string;
  bookTitle: string;
  comment: string;
  date: string;
}

const ReaderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const userName = localStorage.getItem("userName") || "Leitor";
  const userId = localStorage.getItem("userId"); // Pegue o userId do localStorage

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "READER") {
      navigate("/"); // Redireciona para a página inicial se o usuário não for um leitor
    }

    // Busque as recomendações e as avaliações do usuário logado
    fetchRecommendedBooks();
    fetchUserReviews();
  }, [navigate]);

  // Função para buscar livros recomendados (exemplo com dados fictícios)
  const fetchRecommendedBooks = () => {
    setRecommendedBooks([
      { id: "1", title: "O Hobbit", author: "J.R.R. Tolkien", coverImage: "link-da-imagem" },
      { id: "2", title: "1984", author: "George Orwell", coverImage: "link-da-imagem" },
      { id: "3", title: "Dom Quixote", author: "Miguel de Cervantes", coverImage: "link-da-imagem" }
    ]);
  };

  // Função para buscar avaliações recentes do usuário logado
  const fetchUserReviews = async () => {
    try {
      const response = await api.get(`/users/${userId}/reviews`);
      const reviewsData = response.data.map((review: any) => ({
        id: review.id,
        bookTitle: review.book.title, // Ajuste de acordo com a estrutura da resposta
        comment: review.comment,
        date: new Date(review.createdAt).toLocaleDateString("pt-BR") // Formatação de data
      }));
      setRecentReviews(reviewsData);
    } catch (error) {
      console.error("Erro ao buscar avaliações do usuário:", error);
    }
  };

  return (
    <div className="reader-dashboard">
      <h1>Bem-vindo(a) de volta, {userName}!</h1>
      <p>Que bom ter você por aqui. Vamos explorar alguns livros incríveis hoje?</p>

      <section className="recommended-books">
        <h2>Recomendações para você</h2>
        <div className="book-list">
          {recommendedBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.coverImage} alt={book.title} />
              <h3>{book.title}</h3>
              <p>por {book.author}</p>
              <button>Ver mais</button>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-reviews">
        <h2>Suas Avaliações Recentes</h2>
        <div className="review-list">
          {recentReviews.map((review) => (
            <div key={review.id} className="review-card">
              <h4>{review.bookTitle}</h4>
              <p>"{review.comment}"</p>
              <span>{review.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="daily-quote">
        <h3>Inspiração do Dia</h3>
        <p>"Um leitor vive mil vidas antes de morrer, disse Jojen. Aquele que nunca lê vive apenas uma." – George R.R. Martin</p>
      </section>
    </div>
  );
};

export default ReaderDashboard;
