import { GrafoLib } from "../models/GrafoLib";

export default function gerarGrafoRegular(n: number, k: number): void {
    if (n <= 0 || k < 0 || k >= n || (n * k) % 2 !== 0) {
      throw new Error('Combinação inválida de n e k para gerar um grafo k-regular.');
    }
  
    const grafo = new GrafoLib();
  
    for (let i = 0; i < n; i++) {
      grafo.adicionarVertice(i);
    }
  
    const arestasDesejadas = (n * k) / 2; 
  
    const vertices = Array.from(grafo.vertices.keys()); 
  
    let contadorArestas = 0;
    let indiceVerticeAtual = 0;
  
    while (contadorArestas < arestasDesejadas) {
      const verticeOrigem = vertices[indiceVerticeAtual];
      const vizinhos = grafo.listaAdjacencia.get(verticeOrigem) || [];
  
      if (vizinhos.length < k) {
        let vizinhoValido = false;
        let indiceVerticeDestino = (indiceVerticeAtual + 1) % n; 
  
        while (!vizinhoValido && indiceVerticeDestino !== indiceVerticeAtual) {
          const verticeDestino = vertices[indiceVerticeDestino];
          const vizinhosDestino = grafo.listaAdjacencia.get(verticeDestino) || [];
  
          if (vizinhosDestino.length < k && !vizinhos.includes(verticeDestino) && verticeOrigem !== verticeDestino) {
            grafo.adicionarAresta(verticeOrigem, verticeDestino);
            contadorArestas++;
            vizinhoValido = true;
          }
  
          indiceVerticeDestino = (indiceVerticeDestino + 1) % n; 
        }
      }
  
      indiceVerticeAtual = (indiceVerticeAtual + 1) % n; 
    }
  
    grafo.imprimirGrafo();
  }
  