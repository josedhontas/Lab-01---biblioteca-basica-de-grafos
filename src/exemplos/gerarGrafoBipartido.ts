import { GrafoLib } from "../models/GrafoLib";

export default function gerarGrafoBipartido(n1: number, n2: number): GrafoLib {
    const grafo = new GrafoLib();
  
    for (let i = 0; i < n1; i++) {
      grafo.adicionarVertice(i, `V${i}`);
    }
  
    for (let i = 0; i < n2; i++) {
      grafo.adicionarVertice(n1 + i, `U${i}`);
    }
  
    for (let i = 0; i < n1; i++) {
      for (let j = 0; j < n2; j++) {
        grafo.adicionarAresta(i, n1 + j);
      }
    }
  
    return grafo;
  }
  