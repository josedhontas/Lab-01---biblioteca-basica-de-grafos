import { GrafoLib } from "../models/GrafoLib";

export default function gerarGrafoRegular(n: number, k: number) {
  const grafo = new GrafoLib();

  // Adiciona os vértices ao grafo
  for (let i = 0; i < n; i++) {
    grafo.adicionarVertice(i);
  }

  // Cria uma lista circular de vértices
  const vertices = Array.from(grafo.vertices.keys());

  // Percorre os vértices e adiciona as arestas para os vértices adjacentes
  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k / 2; j++) {
      const verticeOrigem = vertices[i];
      const verticeDestino = vertices[(i + j) % n];

      // Adiciona a aresta somente se ainda não existir
      if (!grafo.saoVizinhos(verticeOrigem, verticeDestino)) {
        grafo.adicionarAresta(verticeOrigem, verticeDestino);
      }
    }
  }

   grafo.imprimirGrafo();
}
