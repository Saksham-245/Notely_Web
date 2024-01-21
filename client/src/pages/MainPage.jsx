import { useNavigate } from "react-router"
import { api } from "../utils/api"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function MainPage() {
  const navigate = useNavigate();
  const { unsetUser } = useContext(AuthContext);

  const onLogout = async () => {
    try {
      await api.logout();
      unsetUser();
      navigate('/');
    } catch (e) {
      console.error(e.message);
    }
  }
  return (
    <div>
      <div>Main Page</div>
      <button onClick={onLogout}>
        Logout
      </button>
    </div>

  )
}

export default MainPage