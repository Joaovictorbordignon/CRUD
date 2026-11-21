import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPontos } from "../services/api";
import FiltroPontos from "../components/Filtro";
import Mensagem from "../components/Mensagem";
import TabelaPontos from "../components/Tabela";


export default function ListaPontos() {
  const [pontos, setPontos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [erroExcluir, setErroExcluir] = useState("");
  const [filtro, setFiltro] = useState("");

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

  async function excluirPonto(ponto) {
    if (!window.confirm(`Deseja realmente excluir o ponto "${ponto.name}"?`)) return;
    
    try {
      await excluirPonto(ponto.id);
      setPontos((atuais) => atuais.filter((p) => p.id !== ponto.id));
      setErroExcluir("");
    } catch {
      setErroExcluir(`Não foi possível excluir o ponto "${ponto.name}".`);
    }
  }
const textoFiltro = filtro.trim().toLowerCase();
  const pontosFiltrados = pontos.filter((p) =>
    p.name.toLowerCase.includes(textoFiltro));

  return(
    <section>
      <div className="cabecalho-pagina">
        <h1>pontos geograficos</h1>
        <Link className="botao botao-primario" to="/pontos/novo">
        Novo ponto
        </Link>
      </div>
      {carregando && <Mensagem>Carregando...</Mensagem>}
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

      {!carregando && !erro && (
        <>
          <FiltroPontos valor={filtro} onMudar={setFiltro} />
          {erroExclusao && <Mensagem tipo="erro">{erroExclusao}</Mensagem>}
          {pontosFiltrados.length === 0 ? (
            <Mensagem>Nenhum ponto encontrado.</Mensagem>
          ) : (
            <TabelaPontos pontos={pontosFiltrados} onExcluir={excluir} />
          )}
        </>
      )}
    </section>
  );
}
  

  if (carregando) return <Mensagem>Carregando...</Mensagem>;
  if (erro) return <Mensagem tipo="erro">{erro}</Mensagem>;
  if (pontos.length === 0) return <Mensagem>Nenhum ponto encontrado.</Mensagem>;
  return <TabelaPontos pontos={pontos} onExcluir={() => {}} />;
