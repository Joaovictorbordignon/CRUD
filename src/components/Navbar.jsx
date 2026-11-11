import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__conteudo">
        <span className="navbar__marca">GeoPoint</span>
        <NavLink to="/pontos" end>Pontos</NavLink>
        <NavLink to="/pontos/novo">Novo ponto</NavLink>
      </nav>
    </header>
  );
}