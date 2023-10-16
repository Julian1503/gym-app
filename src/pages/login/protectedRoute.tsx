import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

type ProtectedRouteProps = {
    redirectPath?: string;
}

export function ProtectedRoute({redirectPath = '/login' } : ProtectedRouteProps) {
    const isAuthenticated = useSelector<RootState, boolean>(state => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}