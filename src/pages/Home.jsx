import { useNavigate } from "react-router-dom";

export function Home(){
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <h1>BEM VINDO À NOSSA LOJA VIRTUAL</h1>
            <button onClick={() => navigate("/produtos")}>CONFIRA NOSSOS PRODUTOS</button>
            <footer className="footer">
            <p>Desenvolvido por <a href="https://github.com/mfreitas-dev" target="_blank" rel="noreferrer">Matheus Bomfim</a></p>
            </footer>
        </div>
    )
}