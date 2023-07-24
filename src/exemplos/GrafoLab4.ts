import { GrafoLib } from "../models/GrafoLib"

export default function Grafo4(){
    const grafo4 = new GrafoLib()
    grafo4.adicionarVertice(1, "u")
    grafo4.adicionarVertice(2, "y")
    grafo4.adicionarVertice(3, "v")
    grafo4.adicionarVertice(4, "x")
    grafo4.adicionarVertice(5, "w")
    grafo4.adicionarAresta(1,2)
    grafo4.adicionarAresta(1,3)
    grafo4.adicionarAresta(2,3)
    grafo4.adicionarAresta(3,2)
    grafo4.adicionarAresta(2,4)
    grafo4.adicionarAresta(2,5)
    grafo4.adicionarAresta(3,5)
    grafo4.adicionarAresta(4,5)

    let grafoaux = new GrafoLib()
    grafoaux = grafo4

    var verticesSelecionados = new Set([ 1,2,3,4]); 
    var arestasSelecionadas = new Set<[number, number]>();
    arestasSelecionadas.add([1, 2]);

    // Cria subgrafo proprio
    //(grafo4.criarSubgrafo(verticesSelecionados, arestasSelecionadas)).imprimirGrafo()

    /*/ Cria sugrafo gerador tenho que ajustar
    verticesSelecionados = new Set([1,2,3,4,5])
    arestasSelecionadas = new Set<[number, number]>();
    arestasSelecionadas.add([1, 2]);
    arestasSelecionadas.add([1, 3]);
    arestasSelecionadas.add([1, 3]);*/

    // Seja X1 = {y, v, x, u}, gerar o subgrafo induzido G[X1]
    //verticesSelecionados = new Set([1,2,3,4])
    //grafo4.subgrafoInduzido(verticesSelecionados)
    
    verticesSelecionados = new Set([1,5])
    grafoaux.subtrairVertices(verticesSelecionados)
    
}