// src/components/BookList.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import BookCards from "./BookCards";

interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  publicationYear: number;
  summary: string | null;
  authors: Author[];
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get("/booklist/books")
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Erro ao buscar livros");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando livros...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Lista de Livros</h2>
      <div className="row">
        {books.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
            <BookCards
              id={book.id}
              title={book.title}
              publicationYear={book.publicationYear}
              authors={book.authors}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
