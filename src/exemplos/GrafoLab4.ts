import { GrafoLib } from "../models/GrafoLib"

export default function Grafo4() {
    const grafo4 = new GrafoLib()
    grafo4.adicionarVertice(1, "u")
    grafo4.adicionarVertice(2, "y")
    grafo4.adicionarVertice(3, "v")
    grafo4.adicionarVertice(4, "x")
    grafo4.adicionarVertice(5, "w")
    grafo4.adicionarAresta(1, 2)
    grafo4.adicionarAresta(1, 3)
    grafo4.adicionarAresta(2, 3)
    grafo4.adicionarAresta(3, 2)
    grafo4.adicionarAresta(2, 4)
    grafo4.adicionarAresta(2, 5)
    grafo4.adicionarAresta(3, 5)
    grafo4.adicionarAresta(4, 5)

    console.log("a) Gerar um subgrafo próprio")
    var verticesSelecionados = new Set([1, 2, 3, 4]);
    var arestasSelecionadas = new Set<[number, number]>();
    arestasSelecionadas.add([1, 2]);
    arestasSelecionadas.add([1, 3]);
    grafo4.criarSubgrafo(verticesSelecionados, arestasSelecionadas)

    console.log("\n")
    console.log("b) Gerar um subgrafo gerador")
    var arestasSelecionadas2 = new Set<[number, number]>();
    arestasSelecionadas2.add([1, 2]);
    let grafoaux = new GrafoLib()
    grafoaux = grafo4
    grafoaux.subtrairArestas(arestasSelecionadas2)

    console.log("\n")
    console.log("c) Seja X1 = {y, v, x, u}, gerar o subgrafo induzido G[X1]")
    verticesSelecionados = new Set([1, 2, 3, 4])
    grafo4.subgrafoInduzido(verticesSelecionados)

    console.log("\n")
    console.log("d) Seja X2 = {u,w}, gerar G-X2")
    const grafo4clone = grafo4.cloneGrafo(grafo4)
    verticesSelecionados = new Set([1, 5])
    grafo4clone.subtrairVertices(verticesSelecionados)
    
    console.log("\n")
    console.log("e) Seja E1 = {a,c,e,g}, gerar o subgrafo aresta-induzido G[E1]")
    var arestasSelecionadasArestaInduzido = new Set<[number, number]>();
    arestasSelecionadasArestaInduzido.add([1, 3]); // a
    arestasSelecionadasArestaInduzido.add([4, 5]);
    arestasSelecionadasArestaInduzido.add([1, 2]);
    arestasSelecionadasArestaInduzido.add([3, 2]);
    grafo4.subgrafoArestaInduzido(arestasSelecionadasArestaInduzido);
}