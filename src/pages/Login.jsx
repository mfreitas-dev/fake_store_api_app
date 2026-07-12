import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(){
        try{
            await login(username, password);
            navigate("/produtos");
        } catch(erro){
            setError(erro.message);
        }
    };

    return (
        <>
            <div className="login_card">
                <input type="text" name="username" id="userinput" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <input type="password" name="password" id="passwinput" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <button type="submit" onClick={() => handleSubmit()}>Fazer Login</button>
            </div>
            {(error !== "") && 
            <div >
                <p>Erro ao tentar fazer login: Código {error}</p>
                <p>Contate o administrador</p>
            </div>}
        </>
    )
};