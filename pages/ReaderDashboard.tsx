import React from "react";
import { Button } from "react-bootstrap";

const ReaderDashboard: React.FC = () => {
  const userName = localStorage.getItem("userName") || "Leitor";

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      <header className="text-center mb-5">
        <h1 className="fw-bold">Bem-vindo, {userName}!</h1>
        <p className="text-muted">
          Explore, avalie e compartilhe suas opiniões sobre livros. Esta é a sua
          área personalizada no BookList.
        </p>
      </header>


      <section className="mb-5 text-center">
        <h3 className="text-center mb-4">Se prepare para sua próxima aventura literária!</h3>
        <ul className="list-unstyled">
          <li
            style={{
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              backgroundColor: "rgba(248, 249, 250, 0.5)", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
              maxWidth: "600px", 
              margin: "0 auto", 
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Descubra Novos Livros</h3>
            <p style={{ marginBottom: "15px" }}>
              Explore nossa coleção de livros, encontre sua próxima leitura e
              avalie livros que você já leu.
            </p>
            <Button href="/books" variant="primary">
              Explorar Livros
            </Button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReaderDashboard;
