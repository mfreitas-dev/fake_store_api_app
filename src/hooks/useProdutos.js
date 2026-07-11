import { useEffect, useState } from "react";
import { get } from "../services/api";

export function useProdutos(){
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controladora = new AbortController();

        async function busca() {
            try {
                setLoading(true);
                const busca = await get("/products", controladora.signal);
                setProdutos(busca);
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
    }, []);

    return {produtos, loading, error}
};