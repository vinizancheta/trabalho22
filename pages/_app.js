import '../styles/globals.css'
import {supabase} from "../lib/initSupabase";
import {UserContextProvider} from "../lib/UserContext";
import '../styles/index.css';
import '../styles/App.css'; // Importando o CSS global
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando Bootstra

function MyApp({Component, pageProps}) {
    return (
        <UserContextProvider supabaseClient={supabase}>
            <Component {...pageProps} />
        </UserContextProvider>
    )
}

export default MyApp
