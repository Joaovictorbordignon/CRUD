import { useEffect, useState } from "react";
import { listarPontos } from "../services/api";
import Mensagem from "../components/Mensagem";

export default function ListaPontos() {
  const [pontos, setPontos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setPontos(await listarPontos());
      } catch {
        setErro("Não foi possível carregar os pontos. Verifique se a API está no ar.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <Mensagem>Carregando...</Mensagem>;
  if (erro) return <Mensagem tipo="erro">{erro}</Mensagem>;
  if (pontos.length === 0) return <Mensagem>Nenhum ponto encontrado.</Mensagem>;

  return <p>{pontos.length} ponto(s) carregado(s).</p>;
}