export default function Botao({
  children,
  tipo = "button",
  variante = "primario",
  desabilitado = false,
  onClick,
}) {
  return (
    <button
      type={tipo}
      className={`botao botao-${variante}`}
      disabled={desabilitado}
      onClick={onClick}
    >
      {children}
    </button>
  );
}