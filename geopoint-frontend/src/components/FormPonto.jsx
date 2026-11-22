import { useState } from "react";
import CampoTexto from "./CampoTexto";
import Botao from "./Botao";
import Mensagem from "./Mensagem";

const PONTO_VAZIO = { name: "", description: "", latitude: "", longitude: "" };

export default function FormPonto({ pontoInicial = PONTO_VAZIO, onSalvar, salvando, erroApi }) {
  const [form, setForm] = useState({
    name: pontoInicial.name ?? "",
    description: pontoInicial.description ?? "",
    latitude: String(pontoInicial.latitude ?? ""),
    longitude: String(pontoInicial.longitude ?? ""),
  });
  const [erro, setErro] = useState("");

  function mudar(campo) {
    return (e) => setForm({ ...form, [campo]: e.target.value });
  }

  function validar() {
    const nome = form.name.trim();
    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);

    if (!nome) return "O nome é obrigatório.";
    if (nome.length > 100) return "O nome deve ter no máximo 100 caracteres.";
    if (form.description.length > 255) return "A descrição deve ter no máximo 255 caracteres.";
    if (form.latitude.trim() === "" || Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
      return "A latitude deve ser um número entre -90 e 90.";
    }
    if (form.longitude.trim() === "" || Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
      return "A longitude deve ser um número entre -180 e 180.";
    }
    return "";
  }

  function enviar(e) {
    e.preventDefault();
    const mensagemErro = validar();
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }
    setErro("");
    onSalvar({
      name: form.name.trim(),
      description: form.description.trim(),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    });
  }

  return (
    <form onSubmit={enviar} className="formulario">
      <CampoTexto id="name" rotulo="Nome" valor={form.name} onChange={mudar("name")} />
      <CampoTexto id="description" rotulo="Descrição" valor={form.description} onChange={mudar("description")} />
      <CampoTexto id="latitude" rotulo="Latitude" tipo="number" step="any" valor={form.latitude} onChange={mudar("latitude")} />
      <CampoTexto id="longitude" rotulo="Longitude" tipo="number" step="any" valor={form.longitude} onChange={mudar("longitude")} />

      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      {erroApi && <Mensagem tipo="erro">{erroApi}</Mensagem>}

      <Botao tipo="submit" desabilitado={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </Botao>
    </form>
  );
}