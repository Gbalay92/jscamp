import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return children;
}