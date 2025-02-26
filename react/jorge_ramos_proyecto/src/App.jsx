import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Layout from "./components/Layout"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Users from "./components/Users"
import Students from "./components/Students"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="students" element={<Students />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App