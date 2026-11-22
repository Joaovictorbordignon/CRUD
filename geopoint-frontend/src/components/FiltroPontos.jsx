export default function FiltroPontos ({ valor, onMudar }) {
    return (
        <div className="filtro">
            <label htmlFor="filtro">Filtrar por nome ou descrição</label>
            <input
            id="filtro"
            type="text"
            value={valor}
            onChange={(e) => onMudar(e.target.value)}
            placeholder="Digite para filtrar"
            />
        </div>
    );
}