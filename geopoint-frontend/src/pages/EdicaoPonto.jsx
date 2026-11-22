import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarPonto, atualizarPonto } from "../services/api";
import FormPonto from "../components/FormPonto";
import Mensagem from "../components/Mensagem";

export default function EdicaoPonto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ponto, setPonto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroApi, setErroApi] = useState("");

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
  }, [id]);

  async function salvar(dados) {
    setSalvando(true);
    setErroApi("");
    try {
      await atualizarPonto(id, dados);
      navigate("/pontos");
    } catch {
      setErroApi("Não foi possível salvar as alterações.");
      setSalvando(false);
    }
  }

  if (carregando) return <Mensagem>Carregando...</Mensagem>;
  if (erro) return <Mensagem tipo="erro">{erro}</Mensagem>;

  return (
    <section>
      <h1>Editar ponto</h1>
      <FormPonto
        pontoInicial={ponto}
        onSalvar={salvar}
        salvando={salvando}
        erroApi={erroApi}
      />
    </section>
  );
}