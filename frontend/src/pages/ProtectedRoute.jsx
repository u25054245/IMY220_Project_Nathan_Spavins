import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
    const member = localStorage.getItem("user");
    
    if(!member) {
        return <Navigate to="/" />
    }

    return children;
}

export default ProtectedRoute