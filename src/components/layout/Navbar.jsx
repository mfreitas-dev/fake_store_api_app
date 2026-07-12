import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext";
import { useCarrinho } from "../../contexts/CarrinhoContext";


export function Navbar(){
    const {usuario, logout} = useAuth();
    const {temaClaro, setTemaClaro} = useTheme();
    const {state} = useCarrinho();

    return (
        <nav>
            <Link to="/">Home </Link>
            <Link to="/produtos">Produtos </Link>
            <Link to="/carrinho">Carrinho ({state.length}) </Link>
            {usuario    ? <button onClick={logout} className="botao_logout">Logout</button>
                        : <Link to="/login">Login </Link>}
            <button className="botao_troca_tema" onClick={() => setTemaClaro(!temaClaro)}>{temaClaro ? "Mudar para tema escuro" : "Mudar para tema claro"}</button>
        </nav>
    )
}