import { Link } from "react-router-dom";
import Botao from "./Botao";

export default function LinhaPonto({ ponto, onExcluir }) {
  return (
    <tr>
      <td>
        <Link to={`/pontos/${ponto.id}`}>{ponto.name}</Link>
      </td>
      <td>{ponto.description}</td>
      <td>{ponto.latitude}</td>
      <td>{ponto.longitude}</td>
      <td className="acoes">
        <Link className="botao botao-secundario" to={`/pontos/${ponto.id}`}>
          Ver
        </Link>
        <Link className="botao botao-secundario" to={`/pontos/${ponto.id}/editar`}>
          Editar
        </Link>
        <Botao variante="perigo" onClick={() => onExcluir(ponto)}>
          Excluir
        </Botao>
      </td>
    </tr>
  );
}