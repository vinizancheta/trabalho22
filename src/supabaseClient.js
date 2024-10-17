import { createClient } from '@supabase/supabase-js';

// To be more secure: .env file. 
const supabaseURL = "https://xzxuawqjlbokcliqdple.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHVhd3FqbGJva2NsaXFkcGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MjMyOTAsImV4cCI6MjA0NDM5OTI5MH0.hKFNLEKEJPmh2e5qcozs1E15AkYvCujlGokRUBtwgys";

export const supabase = createClient(supabaseURL, supabaseAnonKey);