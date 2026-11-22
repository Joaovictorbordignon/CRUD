import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buscarPonto, excluirPonto} from "../services/api";
import botao from "../components/Botao";
import mensagem from "../components/Mensagem";
import Mensagem from "../components/Mensagem";



export default function DetalhePonto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ponto, setPonto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setPonto(await buscarPonto(id));
      } catch {
        setErro("Não foi possível carregar o ponto.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  } , [id]);

  async function excluir() {
    if (!window.confirm(`Deseja realmente excluir o ponto "${ponto.name}"?`)) return;
    try {
      await excluirPonto(ponto.id);
      navigate("/pontos");
    } catch { 
      setErro("Não foi possível excluir o ponto.");
    }
  }
  if (carregando) return <mensagem>Carregando...</mensagem>;
  if (!ponto) return <mensagem tipo="erro">Ponto não encontrado.</mensagem>;
  return(
    <section>
      <h1>{ponto.name}</h1>
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

      <d1 className="detalhe">
      <dt>Descrição</dt>
        <dd>{ponto.description || "Sem descrição"}</dd>
        <dt>Latitude</dt>
        <dd>{ponto.latitude}</dd>
        <dt>Longitude</dt>
        <dd>{ponto.longitude}</dd>
      </d1> 

      <div className="acoes">
        <Link className="botao botao-primario" to={`/pontos/${id}/editar`}>
          Editar
        </Link>
        <Botao variante="perigo" onClick={excluir}>
          Excluir
        </Botao>
        <Link className="botao botao-secundario" to="/pontos">
          Voltar
        </Link>
      </div>
    </section>
  );  
        
}