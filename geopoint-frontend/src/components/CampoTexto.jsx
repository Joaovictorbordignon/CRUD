export default function CampoTexto({ id, rotulo, valor, onChange, tipo = "text", ...resto }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{rotulo}</label>
      <input id={id} type={tipo} value={valor} onChange={onChange} {...resto} />
    </div>
  );
}