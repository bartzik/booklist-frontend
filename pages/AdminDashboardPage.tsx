// src/pages/AdminDashboardPage.tsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center">Painel de Gerenciamento</h2>
      <div className="d-grid gap-2 mt-4">
        <Button onClick={() => navigate("/book-cadastro")}>Cadastrar Livro</Button>
        <Button onClick={() => navigate("/author-cadastro")}>Cadastrar Autor</Button>
        <Button onClick={() => navigate("/publisher-cadastro")}>Cadastrar Editora</Button>
      </div>
    </Container>
  );
};

export default AdminDashboardPage;
