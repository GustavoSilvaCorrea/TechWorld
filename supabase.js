import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Configure SUPABASE_URL e SUPABASE_ANON_KEY no arquivo .env');
}

// Use a chave publicável/anon. Não coloque service_role no frontend nem no repositório.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
