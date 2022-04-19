import { useAuth } from "../contexts/AuthContext";

function RequireRole({ requiredRole, children }) {
  const { role } = useAuth();
  // console.log("requirerole", role);

  // if not signed in/ signed up, don't show
  // if (requiredRole.length === 0 && currentUser === null) { return null }

  const access = requiredRole.some((item) => {
    return item === role;
  });

  return access ? { ...children } : null;
}

export default RequireRole;
