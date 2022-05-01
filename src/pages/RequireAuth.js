import { useAuth } from "../contexts/AuthContext";

function RequireAuth({ children }) {
  const { currentUser } = useAuth();
  // console.log("requirenonuser", currentUser);

  return currentUser && { ...children };
}

export default RequireAuth;