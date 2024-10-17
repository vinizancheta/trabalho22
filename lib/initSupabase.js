import {createClient} from "@supabase/supabase-js";

const supabase = createClient(
    "https://xzxuawqjlbokcliqdple.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHVhd3FqbGJva2NsaXFkcGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MjMyOTAsImV4cCI6MjA0NDM5OTI5MH0.hKFNLEKEJPmh2e5qcozs1E15AkYvCujlGokRUBtwgys"
)

export {supabase}