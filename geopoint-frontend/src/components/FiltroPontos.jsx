export default function Botao({ children, onClick, type = 'button', className = '' }) {
    return (
        <div className="filtro">
            <label htmlFor="filtro">Filtrar por nome ou descrição</label>
            <input
            id="filtro"
            type="text"
            value={valor}
            onChange={(e) => onMudar(e.target.value)}
            />
        </div>
    );
}