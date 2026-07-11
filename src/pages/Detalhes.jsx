import { useParams } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useEffect, useState } from "react";
import { get } from "../services/api";


export function Detalhes(){
    const {id} = useParams();
    const {dispatch} = useCarrinho();
    const [loading, setLoading] = useState(false);
    const [detalhes, setDetalhes] = useState({});
    const [error, setError] = useState("");

    function handleButton(){
        dispatch({ type: 'ADICIONAR', payload: detalhes });
    };

    useEffect(() => {
        const controladora = new AbortController();

        async function busca() {
            try {
                setLoading(true);
                const busca = await get(`/products/${id}`, controladora.signal);
                setDetalhes(busca);
            } catch(erro) {
                if(erro.name !== "AbortError"){
                    setError(erro.message);
                    console.error(erro);
                }
            } finally {
                setLoading(false);
            }
        }

        busca();

        return () => controladora.abort();
    }, [id]);

    return (
        <div className="card_detalhes">
            {loading && <p>Carregando o produto...</p>}
            {error && <p>Erro ao buscar os produtos.</p>}
            {Object.keys(detalhes).length !== 0 && (
                <div>
                    <img src={detalhes.image} alt={detalhes.title} />
                    <p>Categoria: {detalhes.category}</p>
                    <p>Título: {detalhes.title}</p>
                    <p>Sobre: {detalhes.description}</p>
                    <p>Valor: {detalhes.price}</p>
                    <button onClick={handleButton}>ADICIONAR AO CARRINHO</button>
                </div>
            )}
        </div>
    )    
};