const teamsDB = [
  {
    id: 1,
    eventId: 1,
    nome: "Code Warriors",
    codigo: "TW-2048",
    liderId: 1,
    membros: [1],
    minMembros: 2,
    maxMembros: 5
  }
];

exports.createTeam = (req, res, next) => {
  try {
    const { eventId, nome, liderId, minMembros, maxMembros } = req.body;

    if (!nome || !eventId || !liderId) {
      return res.status(400).json({ error: true, message: 'Nome da equipe, ID do evento e líder são obrigatórios.' });
    }

    const newTeam = {
      id: teamsDB.length + 1,
      eventId: parseInt(eventId, 10),
      nome,
      codigo: `TW-${Math.floor(1000 + Math.random() * 9000)}`,
      liderId: parseInt(liderId, 10),
      membros: [parseInt(liderId, 10)],
      minMembros: parseInt(minMembros, 10) || 2,
      maxMembros: parseInt(maxMembros, 10) || 5
    };

    teamsDB.push(newTeam);
    res.status(201).json({ success: true, message: 'Equipe criada com sucesso!', team: newTeam });
  } catch (err) {
    next(err);
  }
};

exports.joinTeamByCode = (req, res, next) => {
  try {
    const { codigo, userId } = req.body;
    const team = teamsDB.find(t => t.codigo === codigo);

    if (!team) {
      return res.status(404).json({ error: true, message: 'Código de equipe inválido ou inexistente.' });
    }

    // RN-058: Validação de tamanho máximo
    if (team.membros.length >= team.maxMembros) {
      return res.status(400).json({ error: true, message: 'A equipe já atingiu o número máximo de integrantes.' });
    }

    if (team.membros.includes(userId)) {
      return res.status(400).json({ error: true, message: 'Você já faz parte desta equipe.' });
    }

    team.membros.push(userId);
    res.json({ success: true, message: `Você entrou na equipe ${team.nome}!`, team });
  } catch (err) {
    next(err);
  }
};