

export function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Sobre o BookList</h5>
            <p>
              BookList é um aplicativo onde você pode explorar, avaliar e gerenciar um catálogo de livros.
              Ideal para amantes da leitura e administradores de conteúdo literário.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links Úteis</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-dark">Home</a>
              </li>
              <li>
                <a href="/books" className="text-dark">Livros</a>
              </li>
              <li>
                <a href="/login" className="text-dark">Faça Login ou Cadastre-se</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © {new Date().getFullYear()} BookList - Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
