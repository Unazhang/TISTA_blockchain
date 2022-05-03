import { useAuth } from "../contexts/AuthContext";

function RequireRole({ requiredRole, children }) {
  const { role } = useAuth();
  console.log("requirerole", requiredRole);
  console.log("currentrole", role);

  // if not signed in/ signed up, don't show
  // if (requiredRole.length === 0 && currentUser === null) { return null }

  // const access = requiredRole.some((item) => {
  //   return item === role;
  // });
  let access;

  if (role.length < 0) {
    access = false;
  } else {
    access = role.some((item) => {
      return requiredRole.includes(item);
    });
  }

  console.log(access);

  return access ? { ...children } : null;
}

export default RequireRole;
