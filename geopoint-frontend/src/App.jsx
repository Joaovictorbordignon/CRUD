import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListaPontos from "./pages/ListaPontos";
import CadastroPonto from "./pages/CadastroPonto";
import DetalhePonto from "./pages/DetalhePonto";
import EdicaoPonto from "./pages/EdicaoPonto";
import NaoEncontrado from "./pages/NaoEncontrado";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/pontos" replace />} />
          <Route path="/pontos" element={<ListaPontos />} />
          <Route path="/pontos/novo" element={<CadastroPonto />} />
          <Route path="/pontos/:id" element={<DetalhePonto />} />
          <Route path="/pontos/:id/editar" element={<EdicaoPonto />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
    </>
  );
}