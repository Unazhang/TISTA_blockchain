import { useAuth } from "../contexts/AuthContext";

function RequireRole({ requiredRole, children }) {
  const { role } = useAuth();

  return role === requiredRole ? { ...children } : null;
}

export default RequireRole;
