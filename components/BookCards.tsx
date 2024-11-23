// src/components/BookCards.tsx
import React from "react";

interface Author {
  id: string;
  name: string;
}

interface BookCardsProps {
  id: string; // Recebe o id do livro
  title: string;
  publicationYear: number;
  authors: Author[];
}

const BookCards: React.FC<BookCardsProps> = ({ id, title, publicationYear, authors }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Publicado em {publicationYear}</p>
        <p className="card-text">
          Autor(es): {authors.map((author) => author.name).join(", ")}
        </p>
        <a href={`/books/${id}`} className="btn btn-primary">Ver detalhes</a> {/* Usa o id corretamente */}
      </div>
    </div>
  );
};

export default BookCards;
