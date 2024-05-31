import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredState }) => {
    const location = useLocation();

    if (!location.state || !requiredState.every(key => key in location.state)) {
        // Redirect to the fallback route if the required state is not present
        return <Navigate to="/dashboard/categories" replace />;
    }

    return children;
};

export default ProtectedRoute;
