import { GrafoLib } from "../models/GrafoLib";

export default function Grafo2(){
    const grafo2 = new GrafoLib(true)
    grafo2.adicionarVertice(0)
    grafo2.adicionarVertice(1)
    grafo2.adicionarVertice(2)
    grafo2.adicionarVertice(3)
    grafo2.adicionarVertice(4)
    grafo2.adicionarAresta(0,1)
    grafo2.adicionarAresta(0,2)
    grafo2.adicionarAresta(0,3)
    grafo2.adicionarAresta(0,4)
    grafo2.adicionarAresta(1,2)
    grafo2.adicionarAresta(1,3)
    grafo2.adicionarAresta(1,4)
    grafo2.adicionarAresta(2,3)
    grafo2.adicionarAresta(2,4)
    grafo2.adicionarAresta(3,4)

    return grafo2;

}