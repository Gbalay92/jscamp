import { Link } from "./Link";
import { useAuth } from "../context/AuthContext";
import { useFavoritesStore } from "../store/favoritesStore";

export function Header() {
    const {  countFavorites } = useFavoritesStore();
    const { isLoggedIn, handleLogin, handleLogout } = useAuth();

    const numberOfFavorites = countFavorites();
    return (
        <>
            <header>
                <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>DevJobs</h1>
                <nav aria-label="nav bar">
                    <Link href="./">Inicio</Link>
                    <Link href="./search">Empleos</Link>
                    <Link href="./contact">Contacto</Link>
                    {
                    isLoggedIn && <Link href="./profile">Profile (❤️{numberOfFavorites})</Link>
                    }
                </nav>
                {
                    isLoggedIn
                        ? <button onClick={handleLogout}>Cerrar sesión</button>
                        : <button onClick={handleLogin}>Iniciar sesión</button>
                }
            </header>
            
        </>
    )
}