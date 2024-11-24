interface BookCardsProps {
  id: string;
  title: string;
  publicationYear: number;
  authors: Author[];
  photoUrl?: string; // Campo opcional para a URL da foto
}

const BookCards: React.FC<BookCardsProps> = ({
  id,
  title,
  publicationYear,
  authors,
  photoUrl,
}) => {
  console.log(`Renderizando livro: ${title}, Foto: ${photoUrl}`); // Adiciona log para verificar a URL da foto
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
            width: "100%", // Largura total do card
            height: "400px", // Altura fixa para todas as imagens
            objectFit: "cover", // Ajusta a imagem sem distorcer
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
