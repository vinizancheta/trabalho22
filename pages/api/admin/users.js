import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  'https://xzxuawqjlbokcliqdple.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHVhd3FqbGJva2NsaXFkcGxlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODgyMzI5MCwiZXhwIjoyMDQ0Mzk5MjkwfQ.hYmNXZ7LJjZ8rkqREDXlMmTqSLDYgw8lWC1eky_cVlM' // Chave de serviço
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseAdmin.auth.api.listUsers();
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
