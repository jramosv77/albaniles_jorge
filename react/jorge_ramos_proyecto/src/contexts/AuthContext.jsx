"use client"
import { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { login as apiLogin, logout as apiLogout } from "../services/auth"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decodedToken = jwtDecode(token)
            setUser(decodedToken.user)
        }
    }, [])

    const login = async (username, password) => {
        try {
            const token = await apiLogin(username, password)
            localStorage.setItem("token", token)
            const decodedToken = jwtDecode(token)
            setUser(decodedToken.user)
            navigate("/profile")
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        }
    }

    const logout = () => {
        apiLogout()
        localStorage.removeItem("token")
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

