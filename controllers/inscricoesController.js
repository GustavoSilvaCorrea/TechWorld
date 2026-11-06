import { supabase } from '../supabase.js';

export async function inscreverUsuario(req, res) {
  const usuario_id = Number(req.body.usuario_id);
  const evento_id = Number(req.body.evento_id);

  if (!Number.isInteger(usuario_id) || usuario_id <= 0 ||
      !Number.isInteger(evento_id) || evento_id <= 0) {
    return res.status(400).json({ erro: 'Informe usuario_id e evento_id válidos.' });
  }

  const { data: evento, error: eventoError } = await supabase
    .from('eventos')
    .select('id, status, inscricoes_inicio, inscricoes_fim, limite_vagas')
    .eq('id', evento_id)
    .maybeSingle();

  if (eventoError) return res.status(500).json({ erro: eventoError.message });
  if (!evento) return res.status(404).json({ erro: 'Evento não encontrado.' });
  if (evento.status !== 'PUBLICADO') {
    return res.status(409).json({ erro: 'Este evento não está recebendo inscrições.' });
  }

  const agora = Date.now();
  if (agora < new Date(evento.inscricoes_inicio).getTime() ||
      agora > new Date(evento.inscricoes_fim).getTime()) {
    return res.status(409).json({ erro: 'As inscrições não estão abertas.' });
  }

  const { data: existentes, error: existentesError } = await supabase
    .from('inscricoes')
    .select('id, status')
    .eq('evento_id', evento_id)
    .eq('status', 'CONFIRMADA');

  if (existentesError) return res.status(500).json({ erro: existentesError.message });
  if (existentes.length >= evento.limite_vagas) {
    return res.status(409).json({ erro: 'Não há vagas disponíveis.' });
  }

  // Se já existe inscrição cancelada, reativa a mesma linha.
  const { data: anterior, error: anteriorError } = await supabase
    .from('inscricoes')
    .select('id, status')
    .eq('usuario_id', usuario_id)
    .eq('evento_id', evento_id)
    .maybeSingle();

  if (anteriorError) return res.status(500).json({ erro: anteriorError.message });
  if (anterior?.status === 'CONFIRMADA') {
    return res.status(409).json({ erro: 'Usuário já está inscrito neste evento.' });
  }

  let resultado;
  let error;

  if (anterior) {
    ({ data: resultado, error } = await supabase
      .from('inscricoes')
      .update({ status: 'CONFIRMADA', data_inscricao: new Date().toISOString(), cancelada_em: null })
      .eq('id', anterior.id)
      .select()
      .single());
  } else {
    ({ data: resultado, error } = await supabase
      .from('inscricoes')
      .insert([{ usuario_id, evento_id, status: 'CONFIRMADA' }])
      .select()
      .single());
  }

  if (error) return res.status(400).json({ erro: error.message });
  return res.status(201).json(resultado);
}

export async function listarInscricoesUsuario(req, res) {
  const usuarioId = Number(req.params.usuarioId);
  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    return res.status(400).json({ erro: 'ID do usuário inválido.' });
  }

  const { data, error } = await supabase
    .from('inscricoes')
    .select('*, eventos(id, titulo, descricao, modalidade, data_inicio, data_fim, status, imagem_url)')
    .eq('usuario_id', usuarioId)
    .order('data_inscricao', { ascending: false });

  if (error) return res.status(500).json({ erro: error.message });
  return res.json(data);
}

export async function listarInscricoesEvento(req, res) {
  const eventoId = Number(req.params.eventoId);
  if (!Number.isInteger(eventoId) || eventoId <= 0) {
    return res.status(400).json({ erro: 'ID do evento inválido.' });
  }

  const { data, error } = await supabase
    .from('inscricoes')
    .select('id, status, data_inscricao, cancelada_em, usuarios(id, nome, email)')
    .eq('evento_id', eventoId)
    .order('data_inscricao', { ascending: false });

  if (error) return res.status(500).json({ erro: error.message });
  return res.json(data);
}

export async function cancelarInscricao(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID da inscrição inválido.' });
  }

  const { data, error } = await supabase
    .from('inscricoes')
    .update({ status: 'CANCELADA', cancelada_em: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) return res.status(400).json({ erro: error.message });
  if (!data) return res.status(404).json({ erro: 'Inscrição não encontrada.' });
  return res.json(data);
}
