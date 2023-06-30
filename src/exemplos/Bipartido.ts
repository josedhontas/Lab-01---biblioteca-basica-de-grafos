import { GrafoLib } from "../models/GrafoLib";

export default function Bipartido(grafo: GrafoLib): boolean {
    const numVertices = grafo.vertices.size;
    const conjuntoX: number[] = new Array(numVertices).fill(-1);
    const conjuntoY: number[] = new Array(numVertices).fill(-1);

    const fila: number[] = [];

    for (let vertice = 0; vertice < numVertices; vertice++) {
        if (conjuntoX[vertice] === -1 && conjuntoY[vertice] === -1) {
            conjuntoX[vertice] = 1;
            fila.push(vertice);

            while (fila.length > 0) {
                const verticeAtual = fila.shift()!;

                for (const vizinho of grafo.listaAdjacencia.get(verticeAtual) || []) {
                    if (conjuntoX[vizinho] === -1 && conjuntoY[vizinho] === -1) {
                        conjuntoY[vizinho] = 1 - conjuntoX[verticeAtual];
                        fila.push(vizinho);
                    } else if (conjuntoX[vizinho] === conjuntoX[verticeAtual] || conjuntoY[vizinho] === conjuntoY[verticeAtual]) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

