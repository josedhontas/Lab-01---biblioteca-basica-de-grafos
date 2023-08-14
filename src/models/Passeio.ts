import { GrafoLib } from "./GrafoLib";

export class Passeio {
    private vertices: number[];

    constructor() {
        this.vertices = [];
    }

    adicionarVertice(vertice: number): void {
        this.vertices.push(vertice);
    }

    obterVertices(): number[] {
        return this.vertices;
    }

    tamanho(): number {
        return this.vertices.length;
    }

    imprimirPasseio(grafo: GrafoLib): void {
        for (const vertice of this.vertices) {
            console.log(`Vértice ${vertice} (${grafo.vertices.get(vertice)})`);
        }
    }

    imprimirArestas(grafo: GrafoLib): void {
        for (let i = 0; i < this.vertices.length - 1; i++) {
            const origem = this.vertices[i];
            const destino = this.vertices[i + 1];
            console.log(`Aresta (${origem}, ${destino})`);
        }
    }

    obterReverso(): Passeio {
        const reverso = new Passeio();
        for (let i = this.vertices.length - 1; i >= 0; i--) {
            reverso.adicionarVertice(this.vertices[i]);
        }
        return reverso;
    }

    obterSecao(i: number, j: number): Passeio {
        if (i < 0 || i >= this.vertices.length || j < i || j >= this.vertices.length) {
            throw new Error("Posições inválidas");
        }

        const secao = new Passeio();
        for (let k = i; k <= j; k++) {
            secao.adicionarVertice(this.vertices[k]);
        }
        return secao;
    }

    imprimirReverso(grafo: GrafoLib): void {
        const reverso = this.obterReverso();
        for (const vertice of reverso.vertices) {
            console.log(`Vértice ${vertice} (${grafo.vertices.get(vertice)})`);
        }
    }

    imprimirSecao(grafo: GrafoLib, i: number, j: number): void {
        const secao = this.obterSecao(i, j);
        for (const vertice of secao.vertices) {
            console.log(`Vértice ${vertice} (${grafo.vertices.get(vertice)})`);
        }
        for (let k = i; k < j; k++) {
            const origem = secao.vertices[k];
            const destino = secao.vertices[k + 1];
            console.log(`Aresta (${origem}, ${destino})`);
        }
    }

    encontrarPasseio(grafo: GrafoLib, v: number, x: number): Passeio | null {
        const visitados: Set<number> = new Set();
        const pilha: number[] = [];
        pilha.push(v);

        while (pilha.length > 0) {
            const verticeAtual = pilha.pop() as number;
            visitados.add(verticeAtual);

            if (verticeAtual === x) {
                const passeio = new Passeio();
                for (const vertice of visitados) {
                    passeio.adicionarVertice(vertice);
                }
                return passeio;
            }

            const vizinhos = grafo.listaAdjacencia.get(verticeAtual) || [];
            for (const vizinho of vizinhos) {
                if (!visitados.has(vizinho)) {
                    pilha.push(vizinho);
                }
            }
        }

        return null;
    }

    encontrarCaminho(grafo: GrafoLib, v: number, x: number): Passeio | null {
        const visitados: Set<number> = new Set();
        const pilha: number[] = [];
        pilha.push(v);

        while (pilha.length > 0) {
            const verticeAtual = pilha.pop() as number;
            visitados.add(verticeAtual);

            if (verticeAtual === x) {
                const caminho = new Passeio();
                for (const vertice of visitados) {
                    caminho.adicionarVertice(vertice);
                }
                return caminho;
            }

            const vizinhos = grafo.listaAdjacencia.get(verticeAtual) || [];
            for (const vizinho of vizinhos) {
                if (!visitados.has(vizinho)) {
                    pilha.push(vizinho);
                }
            }
        }

        return null;
    }

    buscarCiclo(grafo: GrafoLib): Passeio | null {
        const visitados: Set<number> = new Set();

        for (const vertice of this.vertices) {
            if (!visitados.has(vertice)) {
                const ciclo = this.encontrarCiclo(grafo, vertice, vertice, new Set([vertice]))
                if (ciclo) {
                    return ciclo;
                }
            }
        }

        return null;
    }
    
    encontrarCicloComGrauMaiorOuIgualA2(grafo: GrafoLib): Passeio | null {
        for (const vertice of this.vertices) {
            const vizinhos = grafo.listaAdjacencia.get(vertice) || [];
            if (vizinhos.length >= 2) {
                const ciclo = this.encontrarCiclo(grafo, vertice, vertice, new Set([vertice]));
                if (ciclo) {
                    return ciclo;
                }
            }
        }
        return null;
    }

    private encontrarCiclo(grafo: GrafoLib, verticeInicial: number, verticeAtual: number, visitados: Set<number>): Passeio | null {
        const vizinhos = grafo.listaAdjacencia.get(verticeAtual) || [];
        for (const vizinho of vizinhos) {
            if (vizinho === verticeInicial && visitados.size >= 3) {
                const ciclo = new Passeio();
                for (const v of visitados) {
                    ciclo.adicionarVertice(v);
                }
                ciclo.adicionarVertice(verticeInicial);
                return ciclo;
            }
            if (!visitados.has(vizinho)) {
                visitados.add(vizinho);
                const ciclo = this.encontrarCiclo(grafo, verticeInicial, vizinho, visitados);
                if (ciclo) {
                    return ciclo;
                }
                visitados.delete(vizinho);
            }
        }
        return null;
    }

    encontrarCicloComAresta(aresta: [number, number], grafo: GrafoLib): Passeio | null {
        const [u, v] = aresta;

        const trilhaSemAresta = new Passeio();
        for (const vertice of this.vertices) {
            if (vertice !== u && vertice !== v) {
                trilhaSemAresta.adicionarVertice(vertice);
            }
        }

        const caminho = trilhaSemAresta.encontrarCaminho(grafo, u, v);

        if (caminho) {
            const ciclo = new Passeio();
            ciclo.adicionarVertice(u);
            for (const vertice of caminho.obterVertices()) {
                ciclo.adicionarVertice(vertice);
            }
            ciclo.adicionarVertice(v);
            return ciclo;
        }

        return null;
    }

    encontrarCaminhoEntreUV(u: number, v: number, grafo: GrafoLib): Passeio | null {
        const caminho = this.encontrarCaminho(grafo, u, v);
    
        if (caminho) {
          return caminho;
        }
    
        return null;
      }

      encontrarCicloComArestaNaTrilha(trilha: Passeio, aresta: [number, number], grafo: GrafoLib): Passeio | null {
        const [u, v] = aresta;
    
        const trilhaSemAresta = new Passeio();
        for (const vertice of trilha.obterVertices()) {
            if (vertice !== u && vertice !== v) {
                trilhaSemAresta.adicionarVertice(vertice);
            }
        }
    
        const caminho = trilhaSemAresta.encontrarCaminho(grafo, u, v);
    
        if (caminho) {
            const ciclo = new Passeio();
            ciclo.adicionarVertice(u);
            for (const vertice of caminho.obterVertices()) {
                ciclo.adicionarVertice(vertice);
            }
            ciclo.adicionarVertice(v);
            return ciclo;
        }
    
        return null;
    }
    
}
