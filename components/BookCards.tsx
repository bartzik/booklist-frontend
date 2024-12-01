interface BookCardsProps {
  id: string;
  title: string;
  publicationYear: number;
  authors: Author[];
  photoUrl?: string; 
}

const BookCards: React.FC<BookCardsProps> = ({
  id,
  title,
  publicationYear,
  authors,
  photoUrl,
}) => {
  console.log(`Renderizando livro: ${title}, Foto: ${photoUrl}`);
  return (
    <div className="card" style={{ width: "18rem" }}>
      {/* Adiciona a foto do livro */}
      {photoUrl && (
        <img
          src={
            photoUrl.startsWith("http")
              ? photoUrl
              : `http://localhost:8080${photoUrl}`
          }
          className="card-img-top"
          alt={`Capa de ${title}`}
          style={{
            width: "100%",
            height: "400px", 
            objectFit: "cover", 
          }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Publicado em {publicationYear}</p>
        <p className="card-text">
          Autor(es): {authors.map((author) => author.name).join(", ")}
        </p>
        <a href={`/books/${id}`} className="btn btn-primary">
          Ver detalhes
        </a>
      </div>
    </div>
  );
};


export default BookCards;
