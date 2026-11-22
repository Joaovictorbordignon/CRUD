const API_URL = 'http://localhost:8080';

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}));
    throw new Error(corpo.message || corpo.erro || `Erro ${resposta.status}`);
  }

  if (resposta.status === 204) return null;
  return resposta.json();
}

export const listarPontos = () => requisicao('/api/points');

export const buscarPonto = (id) => requisicao(`/api/points/${id}`);

export const criarPonto = (ponto) =>
  requisicao('/api/points', { method: 'POST', body: JSON.stringify(ponto) });

export const atualizarPonto = (id, ponto) =>
  requisicao(`/api/points/${id}`, { method: 'PUT', body: JSON.stringify(ponto) });

export const excluirPonto = (id) =>
  requisicao(`/api/points/${id}`, { method: 'DELETE' });  