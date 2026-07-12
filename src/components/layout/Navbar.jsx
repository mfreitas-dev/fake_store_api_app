import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"


export function Navbar(){
    const {usuario, logout} = useAuth();
    return (
        <nav>
            <Link to="/">Home </Link>
            <Link to="/produtos">Produtos </Link>
            <Link to="/carrinho">Carrinho </Link>
            {usuario    ? <button onClick={logout}>Logout</button>
                        : <Link to="/login">Login </Link>}
        </nav>
    )
}