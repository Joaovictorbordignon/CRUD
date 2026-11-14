const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const ARQUIVO = path.join(__dirname, 'pontos.json');

function carregar() {
  try {
    return JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
  } catch {
    return [];
  }
}

function salvar() {
  fs.writeFileSync(ARQUIVO, JSON.stringify(pontos, null, 2));
}

let pontos = carregar();

function validar(corpo) {
  const { name, description, latitude, longitude } = corpo;
  if (typeof name !== 'string' || !name.trim() || name.length > 100) return 'Nome obrigatório (até 100 caracteres).';
  if (description != null && (typeof description !== 'string' || description.length > 255)) return 'Descrição com até 255 caracteres.';
  if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) return 'Latitude deve ser um número entre -90 e 90.';
  if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) return 'Longitude deve ser um número entre -180 e 180.';
  return null;
}

function montarPonto(id, corpo) {
  return {
    id,
    name: corpo.name.trim(),
    description: corpo.description ?? '',
    latitude: corpo.latitude,
    longitude: corpo.longitude
  };
}

app.get('/api/points', (req, res) => res.json(pontos));

app.get('/api/points/:id', (req, res) => {
  const ponto = pontos.find((p) => p.id === req.params.id);
  if (!ponto) return res.status(404).json({ message: 'Ponto não encontrado' });
  res.json(ponto);
});

app.post('/api/points', (req, res) => {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ message: erro });
  const ponto = montarPonto(randomUUID(), req.body);
  pontos.push(ponto);
    salvar();
  res.status(201).json(ponto);
});

app.put('/api/points/:id', (req, res) => {
  const indice = pontos.findIndex((p) => p.id === req.params.id);
  if (indice === -1) return res.status(404).json({ message: 'Ponto não encontrado' });
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ message: erro });
  pontos[indice] = montarPonto(req.params.id, req.body);
    salvar();
  res.json(pontos[indice]);
});

app.delete('/api/points/:id', (req, res) => {
  const indice = pontos.findIndex((p) => p.id === req.params.id);
  if (indice === -1) return res.status(404).json({ message: 'Ponto não encontrado' });
  pontos.splice(indice, 1);
    salvar();
  res.status(204).send();
});

app.listen(8080, () => console.log('GeoPoint API em http://localhost:8080'));