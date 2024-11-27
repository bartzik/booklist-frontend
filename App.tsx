import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import BookCadastroPage from "./pages/BookCadastroPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AuthorCadastroPage from "./pages/AuthorCadastroPage";
import PublisherCadastroPage from "./pages/PublisherCadastroPage";
import ReaderDashboard from "./pages/ReaderDashboard.tsx"; 
import SearchResults from "./pages/SearchResults"; 
import AdminBooksPage from "./pages/AdminBooksPage.tsx";
import AdminAuthorsPage from "./pages/AdminAuthorsPage.tsx";
import AdminPublishersPage from "./pages/AdminPublishersPage.tsx";
import AdminEditPublisherPage from "./pages/AdminEditPublisherPage.tsx";
import AdminEditBookPage from "./pages/AdminEditBookPage.tsx";
// import AdminEditAuthorPage from "./pages/AdminEditAuthorPage.tsx";
import "./App.css";


const App: React.FC = () => {
  const isAdmin = localStorage.getItem("userType") === "ADMIN"; // Verifica se o usuário é ADMIN

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboardPage /> : <Navigate to="/" />} />
            <Route path="/book-cadastro" element={<BookCadastroPage />} />
            <Route path="/author-cadastro" element={<AuthorCadastroPage />} />
            <Route path="/publisher-cadastro" element={<PublisherCadastroPage />} />
            <Route path="/reader-dashboard" element={<ReaderDashboard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/authors" element={<AdminAuthorsPage />} />
            <Route path="/admin/publishers" element={<AdminPublishersPage />} />
            <Route path="/publisher-edit/:id" element={<AdminEditPublisherPage />} />
            <Route path="/book-edit/:id" element={<AdminEditBookPage />} />
            {/* <Route path="/author-edit/:id" element={<AdminEditAuthorPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
