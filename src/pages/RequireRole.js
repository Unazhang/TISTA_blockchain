import { useAuth } from "../contexts/AuthContext";

function RequireRole({ requiredRole, children }) {
  const { role } = useAuth();

  const access = requiredRole.some((item) => {
    return item === role;
  });

  return access ? { ...children } : null;
}

export default RequireRole;
