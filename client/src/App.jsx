import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import MainPage from "./pages/MainPage"
import NewNote from "./pages/NewNote"

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {!user && (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={'/login'} />} /> */}
        </>
      )}
      {user && (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/add" element={<NewNote />} />
        </>
      )}
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}

export default App
