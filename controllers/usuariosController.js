import { supabase } from '../supabase.js';

export async function buscarUsuario(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID do usuário inválido.' });
  }

  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, tipo_conta, ativo, criado_em')
    .eq('id', id)
    .maybeSingle();

  if (error) return res.status(500).json({ erro: error.message });
  if (!data) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  return res.json(data);
}

export async function criarUsuario(req, res) {
  const { nome, email, tipo_conta = 'USUARIO' } = req.body;

  // A senha deve ser criada e validada pelo Supabase Auth; não grave senha em texto puro.
  if (!nome?.trim() || !email?.trim()) {
    return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios.' });
  }

  return res.status(501).json({
    erro: 'Crie a conta pelo Supabase Auth e depois grave o perfil em usuarios. Veja README.md.'
  });
}

export async function listarUsuarios(req, res) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, tipo_conta, ativo, criado_em')
    .order('criado_em', { ascending: false });

  if (error) return res.status(500).json({ erro: error.message });
  return res.json(data);
}
