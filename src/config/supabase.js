// src/config/supabase.js
const { createClient } = require('@supabase/supabase-js');

// IMPORTANTE: a URL da API do Supabase é https://<project-ref>.supabase.co
// (NÃO a URL do dashboard, supabase.com/dashboard/...)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jcdrsumvodjhextwwaft.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_6r_H6MwXaas1_U4wRw2hOA_fWS8YsR0';

if (!SUPABASE_URL.includes('.supabase.co')) {
  console.warn('⚠️  SUPABASE_URL parece inválida. Use https://<project-ref>.supabase.co');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;