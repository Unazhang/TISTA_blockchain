import { useAuth } from "../contexts/AuthContext";

function RequireRole({ requiredRole, children }) {
  const { role } = useAuth();
  // console.log("requirerole", requiredRole);
  // console.log("currentrole", role);

  let access;

  if (!role || role.length < 0) {
    access = false;
  } else {
    access = role.some((item) => {
      return requiredRole.includes(item);
    });
  }

  // console.log(access);

  return access ? { ...children } : null;
}

export default RequireRole;
