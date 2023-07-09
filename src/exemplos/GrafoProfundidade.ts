import { GrafoLib } from "../models/GrafoLib";

export default function GrafoProfundidade(){
    const grafo2 = new GrafoLib()
    grafo2.adicionarVertice(0, "a")
    grafo2.adicionarVertice(1, "b")
    grafo2.adicionarVertice(2, "c")
    grafo2.adicionarVertice(3, "d")
    grafo2.adicionarVertice(4, "e")
    grafo2.adicionarVertice(5, "f")
    grafo2.adicionarVertice(6, "g")
    grafo2.adicionarVertice(7, "h")

    // aresta a
    grafo2.adicionarAresta(0,1)
    grafo2.adicionarAresta(0,2)
    grafo2.adicionarAresta(0,4)
    grafo2.adicionarAresta(0,5)

    // aresta b
    grafo2.adicionarAresta(1,3)
    grafo2.adicionarAresta(1,4)

    //aresta c
    grafo2.adicionarAresta(2,5)
    grafo2.adicionarAresta(2,6)
    grafo2.adicionarAresta(2,7)

    //aresta f
    grafo2.adicionarAresta(5,6)
    grafo2.adicionarAresta(5,7)

    //aresta g
    grafo2.adicionarAresta(6,7)









    return grafo2;

}