import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  publicationYear: number;
  summary: string;
  photoUrl?: string;
  authors: Author[];
}

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await api.get(`/booklist/books/search?query=${encodeURIComponent(query)}`);
          setResults(response.data);
        } catch (error) {
          console.error("Erro ao buscar resultados:", error);
          setError("Erro ao buscar resultados.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <p>Carregando resultados...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (results.length === 0) {
    return <p>Nenhum resultado encontrado para "{query}".</p>;
  }

  return (
    <div className="container">
      <h1 className="mb-4">Resultados da Busca</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {results.map((book) => (
          <div key={book.id} className="col">
            <div className="card h-100">
              {book.photoUrl && (
                <img
                  src={`http://localhost:8080${book.photoUrl}`}
                  alt={`Capa de ${book.title}`}
                  className="card-img-top"
                  style={{ height: "400px", objectFit: "cover",width: "100%", }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  {book.authors.map((author) => author.name).join(", ")}
                </p>
                <p className="card-text">
                  {book.summary?.substring(0, 100)}...
                </p>
                <p className="card-text">
                  Publicado em: {book.publicationYear}
                </p>
                <a href={`/books/${book.id}`} className="btn btn-primary">
                  Ver detalhes
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
