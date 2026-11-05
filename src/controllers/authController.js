// src/controllers/authController.js
const supabase = require('../config/supabase');

exports.register = async (req, res, next) => {
  try {
    const { accountType, nome, email, senha, login, tipoEmpresa, biografiaEmpresa, idade, nomePublico } = req.body;

    if (!email || !senha || !nome) {
      return res.status(400).json({ error: true, message: 'Campos obrigatórios ausentes: nome, e-mail e senha.' });
    }

    // RN-001: Verificar se o e-mail já existe no Supabase
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: true, message: 'Este e-mail já está em uso na plataforma.' });
    }

    // Registar o novo utilizador ou empresa
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          account_type: accountType || 'usuario',
          nome,
          email,
          senha, // Em produção recomendava-se hash de senha ou Supabase Auth
          login: login || email.split('@')[0],
          nome_publico: nomePublico || nome,
          idade: idade || null,
          tipo_empresa: tipoEmpresa || null,
          biografia_empresa: biografiaEmpresa || null
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: `${accountType === 'empresa' ? 'Empresa' : 'Usuário'} cadastrado com sucesso no Supabase!`,
      user: data[0]
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, senha, accountType } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('senha', senha)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: true, message: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
    }

    if (accountType && user.account_type !== accountType) {
      return res.status(403).json({ error: true, message: `Esta conta não pertence ao tipo ${accountType}.` });
    }

    const { senha: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: 'Login realizado com sucesso!',
      user: userWithoutPassword
    });
  } catch (err) {
    next(err);
  }
};