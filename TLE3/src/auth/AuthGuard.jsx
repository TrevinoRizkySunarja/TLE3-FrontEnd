import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function AuthGuard({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}