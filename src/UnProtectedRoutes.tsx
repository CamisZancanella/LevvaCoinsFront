import { Navigate, Outlet } from "react-router-dom";

import { validateToken } from "./helpers/validateToken";

export function UnProtectedRoutes() {
    const isAuthenticated = validateToken();

    return isAuthenticated ? <Navigate to="/home" replace/> : <Outlet/>;
}