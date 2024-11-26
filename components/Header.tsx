import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("sessionId") !== null;
  const userType = localStorage.getItem("userType"); // Pode ser "ADMIN" ou "READER"
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            BookList
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/books">
                  Livros
                </Link>
              </li>
              {userType === "ADMIN" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
              {userType === "READER" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/reader-dashboard">
                    Área do Leitor
                  </Link>
                </li>
              )}
            </ul>
            <form className="d-flex me-auto" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Pesquisar livros, autores ou editoras"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-dark">
                Buscar
              </button>
            </form>
            <ul className="navbar-nav">
              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Faça Login ou Cadastre-se
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
