import { useAuth } from "../contexts/AuthContext";

function RequireNonAuth({ children }) {
  const { currentUser } = useAuth();
  // console.log("requirenonuser", currentUser);

  return currentUser ? null : { ...children };
}

export default RequireNonAuth;
