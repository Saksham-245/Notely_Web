import { useNavigate } from "react-router";
import { api } from "../utils/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

function MainPage() {
  const navigate = useNavigate();
  const { unsetUser } = useContext(AuthContext);

  const onLogout = async () => {
    try {
      await api.logout();
      unsetUser();
      navigate("/");
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return (
    <>
      <Header onLogout={onLogout} />
      <div className="mt-4 h-full">
        <button
          onClick={() => navigate("/add")}
          type="button"
          className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add New Note
        </button>
      </div>
    </>
  );
}

export default MainPage;
