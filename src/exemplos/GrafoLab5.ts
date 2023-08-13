
import { GrafoLib } from "../models/GrafoLib";
import { Passeio } from "../models/Passeio";

export default function GrafoLab5(){

// Função de teste para o Exercício 5.2
function testeImprimirPasseio(passeio: Passeio, grafo: GrafoLib): void {
  console.log("Imprimindo Passeio:");
  passeio.imprimirPasseio(grafo);
  console.log();
}

// Função de teste para o Exercício 5.3
function testeImprimirReverso(passeio: Passeio, grafo: GrafoLib): void {
  console.log("Imprimindo Reverso:");
  const reverso = passeio.obterReverso();
  reverso.imprimirPasseio(grafo);
  console.log();
}

// Função de teste para o Exercício 5.4
function testeObterSecao(passeio: Passeio, grafo: GrafoLib): void {
  console.log("Obtendo Seção (1, 2):");
  const secao = passeio.obterSecao(1, 2);
  secao.imprimirPasseio(grafo);
  console.log();
}

// Função de teste para o Exercício 5.5
function testeEncontrarPasseio(passeio: Passeio, grafo: GrafoLib, v: number, x: number): void {
  const passeioEncontrado = passeio.encontrarPasseio(grafo, v, x);
  console.log(`Encontrado passeio entre ${v} e ${x}:`);
  if (passeioEncontrado) {
    passeioEncontrado.imprimirPasseio(grafo);
  } else {
    console.log("Nenhum passeio encontrado.");
  }
  console.log();
}

// Função de teste para o Exercício 5.6
function testeEncontrarCaminho(passeio: Passeio, grafo: GrafoLib, v: number, x: number): void {
  const caminhoEncontrado = passeio.encontrarCaminho(grafo, v, x);
  console.log(`Encontrado caminho entre ${v} e ${x}:`);
  if (caminhoEncontrado) {
    caminhoEncontrado.imprimirPasseio(grafo);
  } else {
    console.log("Nenhum caminho encontrado.");
  }
  console.log();
}

/*/ Função de teste para o Exercício 5.7
function testeEncontrarCiclo(grafo: GrafoLib): void {
    const cicloEncontrado = passeio.encontrarCiclo(grafo);
    if (cicloEncontrado) {
      console.log("Ciclo encontrado:");
      cicloEncontrado.imprimirPasseio(grafo);
    } else {
      console.log("Nenhum ciclo encontrado.");
    }
    console.log();
  }*/
  
  // Função de teste para o Exercício 5.8
  function testeEncontrarCicloGrafoComGrauMaiorIgualA2(grafo: GrafoLib): void {
    const cicloEncontrado = passeio.encontrarCicloComGrauMaiorOuIgualA2(grafo);
    if (cicloEncontrado) {
      console.log("Ciclo encontrado no grafo com grau >= 2:");
      cicloEncontrado.imprimirPasseio(grafo);
    } else {
      console.log("Nenhum ciclo encontrado no grafo com grau >= 2.");
    }
    console.log();
  }
  

const grafo = new GrafoLib();
grafo.adicionarVertice(1, "v1");
grafo.adicionarVertice(2, "v2");
grafo.adicionarVertice(3, "v3");
grafo.adicionarVertice(4, "v4");
grafo.adicionarVertice(5, "v5");
grafo.adicionarAresta(1, 2);
grafo.adicionarAresta(1, 5);
grafo.adicionarAresta(2, 5);
grafo.adicionarAresta(5, 4);
grafo.adicionarAresta(2, 3);
grafo.adicionarAresta(2, 4);

// Passeio de exemplo
const passeio = new Passeio();
passeio.adicionarVertice(1);
passeio.adicionarVertice(2);
passeio.adicionarVertice(3);
passeio.adicionarVertice(4);
passeio.adicionarVertice(5);

console.log("Exercicio 5.2")
console.log("Vertices do passeio:", passeio.obterVertices());
console.log("Tamanho do passeio:", passeio.tamanho());
testeImprimirPasseio(passeio, grafo);
console.log("Exercicio 5.3")
testeImprimirReverso(passeio, grafo);
console.log("Exercicio 5.4")
testeObterSecao(passeio, grafo);

console.log("Exercicio 5.5")
testeEncontrarPasseio(passeio, grafo, 1, 3);

console.log("Exercicio 5.6")
testeEncontrarCaminho(passeio, grafo, 1, 3);

console.log("Exercicio 5.8")
testeEncontrarCicloGrafoComGrauMaiorIgualA2(grafo)
}
