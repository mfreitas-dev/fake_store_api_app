/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { post } from "../services/api";


const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [usuario, setUsuario] = useState(() => {
        return localStorage.getItem("usuario") || null
    })

    async function login(username, password){
        const resposta = await post("/auth/login", {username, password});
        localStorage.setItem("token", resposta.token);
        localStorage.setItem("usuario", username);
        setUsuario(username);
    };

    async function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
        )
};

export function useAuth(){
    const contexto = useContext(AuthContext)
    if(contexto === null){
        throw new Error("AuthContext está fora do provider")
    };
    return contexto
};