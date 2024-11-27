import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Gerenciar Livros",
      description: "Veja todos os livros cadastrados e adicione novos.",
      navigateTo: "/admin/books",
      icon: "📚",
    },
    {
      title: "Gerenciar Autores",
      description: "Liste e gerencie os autores disponíveis.",
      navigateTo: "/admin/authors",
      icon: "✍️",
    },
    {
      title: "Gerenciar Editoras",
      description: "Visualize e adicione editoras ao catálogo.",
      navigateTo: "/admin/publishers",
      icon: "🏢",
    },
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Painel de Administração</h1>
      <p className="text-center text-muted">
        Escolha uma das categorias abaixo para gerenciar o conteúdo do sistema.
      </p>
      <Row className="g-4">
        {actions.map((action, index) => (
          <Col key={index} md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div style={{ fontSize: "2rem" }}>{action.icon}</div>
                <Card.Title className="my-3">{action.title}</Card.Title>
                <Card.Text className="text-muted">{action.description}</Card.Text>
                <Button variant="primary" onClick={() => navigate(action.navigateTo)}>
                  Gerenciar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;
