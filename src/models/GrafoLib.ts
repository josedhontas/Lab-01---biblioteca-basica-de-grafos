export class GrafoLib {
  public vertices: Map<number, string>;
  private arestas: number;
  public listaAdjacencia: Map<number, number[]>;
  private matrizAdjacencia: number[][];
  private usarMatrizAdjacencia: boolean;

  constructor(usarMatrizAdjacencia: boolean = false) {
    this.vertices = new Map<number, string>();
    this.arestas = 0;
    this.listaAdjacencia = new Map<number, number[]>();
    this.matrizAdjacencia = [];
    this.usarMatrizAdjacencia = usarMatrizAdjacencia;

    if (usarMatrizAdjacencia) {
      for (let i = 0; i < this.vertices.size; i++) {
        this.matrizAdjacencia[i] = [];
        for (let j = 0; j < this.vertices.size; j++) {
          this.matrizAdjacencia[i][j] = 0;
        }
      }
    }
  }

  adicionarVertice(indice: number, rotulo: string = ""): void {
    if (this.usarMatrizAdjacencia) {
      const tamanhoAtual = this.vertices.size;
      this.matrizAdjacencia[indice] = new Array<number>(tamanhoAtual).fill(0);
      this.matrizAdjacencia[indice][indice] = 0;
    } else {
      this.vertices.set(indice, rotulo);
      this.listaAdjacencia.set(indice, []);
    }
  }

  adicionarAresta(verticeOrigem: number, verticeDestino: number): void {
    if (this.usarMatrizAdjacencia) {
      this.matrizAdjacencia[verticeOrigem][verticeDestino] = 1;

      if (verticeOrigem === verticeDestino) {
        const numLacos = this.matrizAdjacencia[verticeOrigem][verticeDestino];
        this.matrizAdjacencia[verticeOrigem][verticeDestino] = numLacos !== undefined ? numLacos + 1 : 2;
      }

      this.matrizAdjacencia[verticeDestino][verticeOrigem] = 1;

      if (verticeOrigem === verticeDestino) {
        const numLacos = this.matrizAdjacencia[verticeDestino][verticeOrigem];
        this.matrizAdjacencia[verticeDestino][verticeOrigem] = numLacos !== undefined ? numLacos + 1 : 2;
      }
    } else {
      if (!this.listaAdjacencia.has(verticeOrigem) || !this.listaAdjacencia.has(verticeDestino)) {
        throw new Error('Vértice(s) não existe(m) no grafo.');
      }

      this.listaAdjacencia.get(verticeOrigem)?.push(verticeDestino);
      this.listaAdjacencia.get(verticeDestino)?.push(verticeOrigem);
    }

    this.arestas++;
  }


  removerAresta(verticeOrigem: number, verticeDestino: number): void {
    if (this.usarMatrizAdjacencia) {
      this.matrizAdjacencia[verticeOrigem][verticeDestino] = 0;
      this.matrizAdjacencia[verticeDestino][verticeOrigem] = 0;
    } else {
      if (!this.listaAdjacencia.has(verticeOrigem) || !this.listaAdjacencia.has(verticeDestino)) {
        throw new Error('Vértice(s) não existe(m) no grafo.');
      }

      const indexOrigem = this.listaAdjacencia.get(verticeOrigem)?.indexOf(verticeDestino);
      const indexDestino = this.listaAdjacencia.get(verticeDestino)?.indexOf(verticeOrigem);

      if (indexOrigem !== undefined && indexOrigem > -1 && indexDestino !== undefined && indexDestino > -1) {
        this.listaAdjacencia.get(verticeOrigem)?.splice(indexOrigem, 1);
        this.listaAdjacencia.get(verticeDestino)?.splice(indexDestino, 1);
        this.arestas--;
      }
    }
  }

  grauVertice(vertice: number): number {
    if (this.usarMatrizAdjacencia) {
      let grau = 0;
      for (let i = 0; i < this.vertices.size; i++) {
        if (this.matrizAdjacencia[vertice][i] === 1) {
          grau++;
        }
      }
      return grau;
    } else {
      if (!this.listaAdjacencia.has(vertice)) {
        throw new Error('Vértice não existe no grafo');
      }

      const grau = this.listaAdjacencia.get(vertice)?.length || 0;
      return grau;
    }
  }

  saoVizinhos(vertice1: number, vertice2: number): boolean {
    if (this.usarMatrizAdjacencia) {
      return this.matrizAdjacencia[vertice1][vertice2] === 1;
    } else {
      if (!this.listaAdjacencia.has(vertice1) || !this.listaAdjacencia.has(vertice2)) {
        return false;
      }

      const vizinhosVertice1 = this.listaAdjacencia.get(vertice1) || [];
      return vizinhosVertice1.includes(vertice2);
    }
  }


  imprimirGrafo(): void {
    if (this.usarMatrizAdjacencia) {
      this.imprimirMatrizAdjacencia();
    } else {
      this.imprimirListaAdjacencia();
    }
    var numVerticesGrauImpar
    const somaGraus = this.calcularSomaGraus();
    const numVerticesGrauPar = this.contarVerticesGrauPar();
    if (this.usarMatrizAdjacencia) {
      numVerticesGrauImpar = this.matrizAdjacencia.length- numVerticesGrauPar;

    }else{
      numVerticesGrauImpar = this.vertices.size - numVerticesGrauPar;
    }
    console.log("\n")
    console.log(`Soma dos graus dos vértices: ${somaGraus}`);
    console.log(`Número de vértices de grau par: ${numVerticesGrauPar}`);
    console.log(`Número de vértices de grau ímpar: ${numVerticesGrauImpar}`);
  }
  
  calcularSomaGraus(): number {
    let soma = 0;
    if (this.usarMatrizAdjacencia) {
      for (let i = 0; i < this.matrizAdjacencia.length; i++) {
        for (let j = 0; j < this.matrizAdjacencia[i].length; j++) {
          soma += this.matrizAdjacencia[i][j];
        }
      }
      soma
    } else {
      for (const indice of this.vertices.keys()) {
        soma += this.grauVertice(indice);
      }
    }
    return soma;
  }
  
  contarVerticesGrauPar(): number {
    let count = 0;
    if (this.usarMatrizAdjacencia) {
      for (let i = 0; i < this.matrizAdjacencia.length; i++) {
        const grau = this.somarLinhaMatriz(i);
        if (grau % 2 === 0) {
          count++;
        }
      }
    } else {
      for (const indice of this.vertices.keys()) {
        if (this.grauVertice(indice) % 2 === 0) {
          count++;
        }
      }
    }
    return count;
  }
  
  
  
  

  somarLinhaMatriz(indice: number): number {
    let soma = 0;
    for (let i = 0; i < this.matrizAdjacencia[indice].length; i++) {
      soma += this.matrizAdjacencia[indice][i];
    }
    return soma;
  }

  imprimirMatrizAdjacencia() {
    console.log(`Número de vértices: ${this.matrizAdjacencia.length}`);
    let arestas = 0;
    for (let i = 0; i < this.matrizAdjacencia.length; i++) {
      for (let j = i; j < this.matrizAdjacencia[i].length; j++) {
        if (this.matrizAdjacencia[i][j] !== 0) {
          arestas++;
        }
      }
    }
    console.log(`Número de arestas: ${arestas}`);
    console.log('Vertices:');
    for (let i = 0; i < this.matrizAdjacencia.length; i++) {
      const grau = this.somarLinhaMatriz(i);
      console.log(`Vértice ${i}: grau ${grau}`);
    }
    console.log('Arestas:');
    for (let i = 0; i < this.matrizAdjacencia.length; i++) {
      for (let j = i; j < this.matrizAdjacencia[i].length; j++) {
        if (this.matrizAdjacencia[i][j] !== 0) {
          process.stdout.write(`(${i}, ${j}),`);
        }
      }
    }
  }

  imprimirListaAdjacencia() {
    console.log(`Número de vértices: ${this.listaAdjacencia.size}`);
    console.log(`Número de arestas: ${this.arestas}`);
    console.log('Vertices:');
    for (const [indice, rotulo] of Array.from(this.vertices.entries())) {
      const grau = this.grauVertice(indice);
      console.log(`Vértice ${indice} (${rotulo}), grau: ${grau}`);
    }
    console.log('Arestas:');
    const arestasVisitadas = new Set();
    for (const [verticeOrigem, vizinhos] of this.listaAdjacencia.entries()) {
      for (const verticeDestino of vizinhos) {
        if (verticeOrigem <= verticeDestino) {
          const aresta = `(${verticeOrigem}, ${verticeDestino})`;
          if (verticeOrigem !== verticeDestino || !arestasVisitadas.has(aresta)) {
            arestasVisitadas.add(aresta);
            process.stdout.write(`${aresta},`);
          }
        }
      }
    }
  }

  ehBipartido(): boolean {
    const visitados: Map<number, number> = new Map();
    const fila: number[] = []; 
    const verticeInicial = this.vertices.keys().next().value; 
    visitados.set(verticeInicial, 0); 

    fila.push(verticeInicial);

    while (fila.length > 0) {
      const verticeAtual = fila.shift() as number;
      const corAtual = visitados.get(verticeAtual) as number;

      const vizinhos = this.listaAdjacencia.get(verticeAtual) || [];
      for (const vizinho of vizinhos) {
        if (!visitados.has(vizinho)) {
          visitados.set(vizinho, 1 - corAtual); 
          fila.push(vizinho);
        } else if (visitados.get(vizinho) === corAtual) {
          return false; 
        }
      }
    }

    return true;
  }

  
  
  
  
}