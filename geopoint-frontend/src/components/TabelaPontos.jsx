import LinhaPonto from "./LinhaPonto";
export default function TabelaPontos({ pontos, onExcluir }) {
    return (
        <div className="tabela-wrapper">
            <table> 
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pontos.map((ponto) => (
                        <LinhaPonto key={ponto.id} ponto={ponto} onExcluir={onExcluir} />
                    ))}
                </tbody>
            </table>
            </div>
    );
}