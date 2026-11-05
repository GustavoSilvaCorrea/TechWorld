const { _usersDB } = require('./authController');

exports.getProfile = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = _usersDB.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: true, message: 'Usuário não encontrado.' });
    }

    const { senha, ...profileData } = user;
    res.json({ success: true, user: profileData });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const userIndex = _usersDB.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: true, message: 'Usuário não encontrado.' });
    }

    const { nome, nomePublico, bio, cidade, estado, interesses } = req.body;

    // Atualiza apenas os campos permitidos (RN-003, RN-007)
    if (nome) _usersDB[userIndex].nome = nome;
    if (nomePublico) _usersDB[userIndex].nomePublico = nomePublico;
    if (bio) _usersDB[userIndex].bio = bio;
    if (cidade) _usersDB[userIndex].cidade = cidade;
    if (estado) _usersDB[userIndex].estado = estado;
    if (interesses) _usersDB[userIndex].interesses = interesses;

    const { senha, ...updatedUser } = _usersDB[userIndex];
    res.json({ success: true, message: 'Perfil atualizado com sucesso!', user: updatedUser });
  } catch (err) {
    next(err);
  }
};