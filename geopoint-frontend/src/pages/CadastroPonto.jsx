import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import FormPonto from "../components/FormPonto";
import { criarPonto } from "../services/api";


export default function CadastroPonto() {
  const navigate = useNavigate();
  const[salvando, setSalvando] = useState(false);
  const[erro, setErroApi] = useState("");

  async function salvar(ponto) {
    setSalvando(true); 
    setErroApi("");
    try {
      await criarPonto(ponto);
      navigate("/pontos");
    } catch (erro) {
      setErroApi("Não foi possível salvar o ponto. Verifique se a API está no ar.");
      setSalvando(false);
    }
  }
 
 return(
  <section>
    <h1>Novo ponto</h1>
    <FormPonto onSalvar={salvar} salvando={salvando} erroAPI={erro} />
    </section>
 );
}
