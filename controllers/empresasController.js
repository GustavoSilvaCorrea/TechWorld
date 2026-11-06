import { supabase } from '../supabase.js';

export async function listarEmpresas(req, res) {
  const { data, error } = await supabase
    .from('empresas')
    .select('id, nome_fantasia, descricao, site_url, logo_url')
    .order('nome_fantasia', { ascending: true });

  if (error) return res.status(500).json({ erro: error.message });
  return res.json(data);
}

export async function buscarEmpresa(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID da empresa inválido.' });
  }

  const { data, error } = await supabase
    .from('empresas')
    .select('*, usuarios(id, nome, email)')
    .eq('id', id)
    .maybeSingle();

  if (error) return res.status(500).json({ erro: error.message });
  if (!data) return res.status(404).json({ erro: 'Empresa não encontrada.' });
  return res.json(data);
}

export async function criarEmpresa(req, res) {
  const { usuario_id, nome_fantasia, razao_social = null, cnpj = null,
          descricao = null, site_url = null, logo_url = null } = req.body;

  if (!usuario_id || !nome_fantasia?.trim()) {
    return res.status(400).json({ erro: 'usuario_id e nome_fantasia são obrigatórios.' });
  }

  const { data, error } = await supabase
    .from('empresas')
    .insert([{ usuario_id, nome_fantasia: nome_fantasia.trim(), razao_social,
      cnpj: cnpj || null, descricao, site_url, logo_url }])
    .select()
    .single();

  if (error) return res.status(400).json({ erro: error.message });
  return res.status(201).json(data);
}

export async function atualizarEmpresa(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID da empresa inválido.' });
  }

  const permitidos = ['nome_fantasia', 'razao_social', 'cnpj', 'descricao', 'site_url', 'logo_url'];
  const atualizacao = Object.fromEntries(
    Object.entries(req.body).filter(([k, v]) => permitidos.includes(k) && v !== undefined)
  );

  if (!Object.keys(atualizacao).length) {
    return res.status(400).json({ erro: 'Nenhum campo válido foi enviado.' });
  }

  const { data, error } = await supabase
    .from('empresas')
    .update(atualizacao)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) return res.status(400).json({ erro: error.message });
  if (!data) return res.status(404).json({ erro: 'Empresa não encontrada.' });
  return res.json(data);
}
