import { supabase } from '../supabase.js';

export async function listarEventos(req, res) {
  const { tipo, modalidade, busca, empresa_id } = req.query;

  let query = supabase
    .from('eventos')
    .select('*, empresas(id, nome_fantasia)')
    .order('data_inicio', { ascending: true });

  // Listagem pública mostra apenas eventos publicados.
  query = query.eq('status', 'PUBLICADO');

  if (tipo) query = query.eq('tipo', tipo);
  if (modalidade) query = query.eq('modalidade', modalidade);
  if (empresa_id) query = query.eq('empresa_id', empresa_id);
  if (busca) query = query.ilike('titulo', `%${busca}%`);

  const { data, error } = await query;
  if (error) return res.status(500).json({ erro: error.message });
  return res.json(data);
}

export async function buscarEventoPorId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID do evento inválido.' });
  }

  const { data, error } = await supabase
    .from('eventos')
    .select('*, empresas(id, nome_fantasia)')
    .eq('id', id)
    .maybeSingle();

  if (error) return res.status(500).json({ erro: error.message });
  if (!data) return res.status(404).json({ erro: 'Evento não encontrado.' });
  return res.json(data);
}

export async function criarEvento(req, res) {
  const {
    empresa_id, titulo, descricao, tipo = 'EVENTO', modalidade,
    data_inicio, data_fim, inscricoes_inicio, inscricoes_fim,
    local = null, link_online = null, limite_vagas, imagem_url = null,
    status = 'RASCUNHO'
  } = req.body;

  if (!empresa_id || !titulo?.trim() || !descricao?.trim() || !modalidade ||
      !data_inicio || !data_fim || !inscricoes_inicio || !inscricoes_fim ||
      !Number.isInteger(Number(limite_vagas)) || Number(limite_vagas) <= 0) {
    return res.status(400).json({ erro: 'Preencha os campos obrigatórios e informe um limite de vagas válido.' });
  }

  if (new Date(data_fim) <= new Date(data_inicio)) {
    return res.status(400).json({ erro: 'A data de término deve ser posterior à data de início.' });
  }

  if (new Date(inscricoes_fim) < new Date(inscricoes_inicio)) {
    return res.status(400).json({ erro: 'O encerramento das inscrições deve ser posterior ou igual à abertura.' });
  }

  const { data, error } = await supabase
    .from('eventos')
    .insert([{
      empresa_id, titulo: titulo.trim(), descricao: descricao.trim(), tipo, modalidade,
      data_inicio, data_fim, inscricoes_inicio, inscricoes_fim,
      local, link_online, limite_vagas: Number(limite_vagas), imagem_url, status
    }])
    .select()
    .single();

  if (error) return res.status(400).json({ erro: error.message });
  return res.status(201).json(data);
}

export async function atualizarEvento(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID do evento inválido.' });
  }

  const camposPermitidos = [
    'titulo', 'descricao', 'tipo', 'modalidade', 'data_inicio', 'data_fim',
    'inscricoes_inicio', 'inscricoes_fim', 'local', 'link_online',
    'limite_vagas', 'status', 'imagem_url'
  ];
  const atualizacao = Object.fromEntries(
    Object.entries(req.body).filter(([chave, valor]) =>
      camposPermitidos.includes(chave) && valor !== undefined
    )
  );

  if (Object.keys(atualizacao).length === 0) {
    return res.status(400).json({ erro: 'Nenhum campo válido foi enviado.' });
  }

  const { data, error } = await supabase
    .from('eventos')
    .update(atualizacao)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) return res.status(400).json({ erro: error.message });
  if (!data) return res.status(404).json({ erro: 'Evento não encontrado.' });
  return res.json(data);
}

export async function cancelarEvento(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID do evento inválido.' });
  }

  const { data, error } = await supabase
    .from('eventos')
    .update({ status: 'CANCELADO' })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) return res.status(400).json({ erro: error.message });
  if (!data) return res.status(404).json({ erro: 'Evento não encontrado.' });
  return res.json(data);
}
