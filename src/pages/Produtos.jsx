import { Link } from "react-router-dom";
import { useProdutos } from "../hooks/useProdutos";


export function Produtos(){
    const {produtos, loading, error} = useProdutos();

    return (
        <>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro ao buscar os produtos.</p>}
            {produtos.map((produto) => (
                <Link to={`/produtos/${produto.id}`} key={produto.id}>
                    <div className="card">
                        <img src={produto.image} alt={"Foto do:"+ produto.title} />
                        <p>Título do item: {produto.title}</p>
                        <p>R${produto.price}</p>
                    </div>
                </Link>
            ))}
        </>
    )
}