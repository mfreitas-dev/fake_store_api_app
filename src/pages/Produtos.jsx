import { Link } from "react-router-dom";
import { useProdutos } from "../hooks/useProdutos";
import { formatarMoeda } from "../utils/formatarMoeda";

export function Produtos(){
    const {produtos, loading, error} = useProdutos();

    return (
        <div className="produtos_page">
            {loading && <p>Carregando...</p>}
            {error && <p>Erro ao buscar os produtos.</p>}
            <div className="produtos_grid">
                {produtos.map((produto) => (
                <Link to={`/produtos/${produto.id}`} key={produto.id}>
                    <div className="card">
                        <img src={produto.image} alt={"Foto do:"+ produto.title} />
                        <h2>Item: {(produto.title).slice(0,45)}...</h2>
                        <p>{produto.rating.rate}⭐</p>
                        <p className="preco">{formatarMoeda(produto.price)}</p>
                    </div>
                </Link>
                ))} 
            </div>
        </div>
    )
};