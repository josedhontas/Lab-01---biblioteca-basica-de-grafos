export class GrafoLib {
  private vertices: Map<number, string>;
  private arestas: number;
  private listaAdjacencia: Map<number, number[]>;
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
    console.log(`Número de vértices: ${this.vertices.size}`);
    console.log(`Número de arestas: ${this.arestas}`);
  
    if (this.usarMatrizAdjacencia) {
      console.log('Representação: Matriz de Adjacência');
      console.log('Matriz de Adjacência:');
      console.log(this.matrizAdjacencia);
    } else {
      console.log('Representação: Lista de Adjacência');
      console.log('Lista de Adjacência:');
  
      for (const [indice, rotulo] of Array.from(this.vertices.entries())) {
        const vizinhos = this.listaAdjacencia.get(indice)?.join(", ") || "";
        const grau = this.grauVertice(indice);
        console.log(`Vértice ${indice} (${rotulo}): vizinhos -> ${vizinhos}, grau: ${grau}`);
      }
    }
  }
  

  private atualizarMatrizAdjacencia(): void {
    this.matrizAdjacencia = [];

    for (let i = 0; i < this.vertices.size; i++) {
      this.matrizAdjacencia[i] = [];
      for (let j = 0; j < this.vertices.size; j++) {
        if (this.saoVizinhos(i, j)) {
          this.matrizAdjacencia[i][j] = 1;
        } else {
          this.matrizAdjacencia[i][j] = 0;
        }
      }
    }
  }

  imprimirMatrizAdjacencia(): void {
    if (this.usarMatrizAdjacencia) {
      this.atualizarMatrizAdjacencia();
      console.log('Matriz de Adjacência:');
      for (let i = 0; i < this.matrizAdjacencia.length; i++) {
        const row = this.matrizAdjacencia[i].map(value => value || 0); // Substitui os valores vazios por 0
        console.log(row);
      }
    } else {
      console.log('A representação atual do grafo não é uma matriz de adjacência.');
    }
  }
}