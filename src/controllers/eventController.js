const supabase = require('../config/supabase');

exports.getAllEvents = async (req, res, next) => {
  try {
    const { search, categoria, modalidade } = req.query;
    let query = supabase.from('events').select('*');

    if (search) {
      query = query.ilike('titulo', `%${search}%`);
    }
    if (categoria && categoria !== 'todos') {
      query = query.eq('categoria', categoria);
    }
    if (modalidade && modalidade !== 'todos') {
      query = query.eq('modalidade', modalidade);
    }

    const { data: events, error } = await query;
    if (error) throw error;

    res.json({ success: true, count: events ? events.length : 0, events: events || [] });
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error || !event) {
      return res.status(404).json({ error: true, message: 'Evento não encontrado.' });
    }

    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { titulo, categoria, descricao, dataInicio, modalidade, local, vagas, preco, empresa } = req.body;

    if ((modalidade === 'presencial' || modalidade === 'hibrido') && !local) {
      return res.status(400).json({ error: true, message: 'Eventos presenciais ou híbridos exigem um local físico.' });
    }

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          titulo,
          categoria: categoria || 'Tecnologia',
          descricao: descricao || '',
          data_inicio: dataInicio,
          modalidade,
          local: modalidade === 'online' ? 'Online' : local,
          vagas: parseInt(vagas, 10) || 100,
          preco: parseFloat(preco) || 0,
          empresa: empresa || 'Empresa Parceira',
          status: 'PUBLICADO'
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Evento criado com sucesso no Supabase!', event: data[0] });
  } catch (err) {
    next(err);
  }
};

exports.registerInEvent = async (req, res, next) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const userId = parseInt(req.body.userId, 10);

    if (Number.isNaN(eventId)) {
      return res.status(400).json({ error: true, message: 'ID do evento inválido.' });
    }
    if (!req.body.userId || Number.isNaN(userId)) {
      return res.status(400).json({ error: true, message: 'Faça login para se inscrever no evento.' });
    }

    const { data, error } = await supabase
      .from('registrations')
      .insert([{ event_id: eventId, user_id: userId }])
      .select();

    if (error) {
      console.error('❌ Erro detalhado do Supabase:', error.code, error.message, error.details, error.hint);

      // Traduz os erros mais comuns do Postgres em mensagens claras
      if (error.code === '23503') {
        return res.status(400).json({ error: true, message: 'Usuário ou evento não existe no banco.' });
      }
      if (error.code === '23505') {
        return res.status(409).json({ error: true, message: 'Você já está inscrito neste evento.' });
      }
      if (error.code === '42501') {
        return res.status(403).json({ error: true, message: 'Permissão negada pelo banco (verifique as políticas RLS da tabela registrations).' });
      }
      if (error.code === '42P01') {
        return res.status(500).json({ error: true, message: 'A tabela registrations não existe no banco.' });
      }
      return res.status(500).json({ error: true, message: `Erro no banco: ${error.message}` });
    }

    res.json({ success: true, message: 'Inscrição realizada com sucesso!', registration: data[0] });
  } catch (err) {
    next(err);
  }
};

exports.cancelRegistration = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const { userId } = req.body;

    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ success: true, message: 'Inscrição cancelada com sucesso.' });
  } catch (err) {
    next(err);
  }
};