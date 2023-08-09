export class GrafoLib {
  public vertices: Map<number, string>;
  private arestas: number;
  public listaAdjacencia: Map<number, number[]>;
  private matrizAdjacencia: number[][];
  private usarMatrizAdjacencia: boolean;
  public arestasArvore: [number, number][] = [];
  public arestasRetorno: [number, number][] = [];
  public profundidadeEntrada: Map<number, number> = new Map();
  public profundidadeSaida: Map<number, number> = new Map();

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

  removerVertice(verticeRemovido: number, rotulo: string = ""): void {
    let contadorVizinhos;
    for (contadorVizinhos = 0; contadorVizinhos < this.listaAdjacencia.size; contadorVizinhos++) {
      if (this.saoVizinhos(verticeRemovido, contadorVizinhos)) {
        this.removerAresta(verticeRemovido, contadorVizinhos);
      }
    }

    this.vertices.delete(verticeRemovido);
    this.listaAdjacencia.delete(verticeRemovido);
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
      numVerticesGrauImpar = this.matrizAdjacencia.length - numVerticesGrauPar;

    } else {
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

  buscaEmProfundidade(verticeInicial: number, verticeFinal: number): void {
    const visitados: Set<number> = new Set();
    this.arestasArvore = [];
    this.arestasRetorno = [];
    this.profundidadeEntrada = new Map<number, number>();
    this.profundidadeSaida = new Map<number, number>();
    let profundidade = 0;
    this.buscaEmProfundidadeAuxiliar(verticeInicial, visitados, profundidade, verticeFinal);
    this.imprimirInformacoesBuscaEmProfundidade();
  }

  private buscaEmProfundidadeAuxiliar(vertice: number, visitados: Set<number>, profundidade: number, verticeFinal: number): void {
    visitados.add(vertice);
    if(vertice === verticeFinal){
      return;
    }
    let rotulo = this.vertices.get(vertice);
    console.log(`Visitando vertice ${vertice} (${rotulo})`)
    this.profundidadeEntrada.set(vertice, profundidade);
    const vizinhos = this.listaAdjacencia.get(vertice) || [];
    for (const vizinho of vizinhos) {
      if (!visitados.has(vizinho)) {
        profundidade++;
        this.arestasArvore.push([vertice, vizinho]);
        this.buscaEmProfundidadeAuxiliar(vizinho, visitados, profundidade, verticeFinal);
        profundidade--;
      } else if (this.profundidadeEntrada.get(vizinho)! !== undefined && profundidade < this.profundidadeEntrada.get(vizinho)!) {
        this.arestasRetorno.push([vertice, vizinho]);
      }
    }

    this.profundidadeSaida.set(vertice, profundidade);
    profundidade++;
  }
/*
  Passeio(verticeInicial: number, verticeFinal: number) : void{
    const visitados: Set<number> = new Set();
    this.arestasArvore = [];
    visitados = PasseioAuxiliar(verticeInicial, visitados, verticeFinal);
    for(let i = 0; i < visitados.length(); i++){   
        let rotulo = this.vertices.get(visitados[i]); 
        console.log(`${visitados[i]}, ${arestasArvore[i]? || []}`);
    }
  }

  PasseioAuxiliar(verticeInicial: number, visitados: set <number>, verticeFinal: number) : any{
    visitados.add(verticeInicial);
    const vizinhos = this.listaAdjacencia.get(vertice) || [];
    if(vizinhos.has(verticeFinal)){
      visitados.add(verticeFinal);
      this.arestaArvore.push([verticeInicial, verticeFinal]);

      return visitados;
    }
    for(const vizinho of vizinhos){
      if(!visitados.has(verticeFinal) && vizinho !== verticeInicial){
        this.arestaArvore.push([vertice, vizinho])
        PasseioAuxiliar(vizinho, visitados, verticeFinal)

      }else if(!visitados.has(verticeFinal)){
        this.arestaArvore.push([vizinho])

      }else{
        return visitados;
      }
    }
  }
  */


  imprimirInformacoesBuscaEmProfundidade(): void {
    console.log('Arestas da árvore:');
    for (const aresta of this.arestasArvore) {
      console.log(`(${aresta[0]}, ${aresta[1]})`);
    }

    console.log('Arestas de retorno:');
    for (const aresta of this.arestasRetorno) {
      console.log(`(${aresta[0]}, ${aresta[1]})`);
    }

    console.log('Profundidades de entrada e saída dos vértices:');
    for (const [vertice, profundidadeEntrada] of this.profundidadeEntrada.entries()) {
      const profundidadeSaida = this.profundidadeSaida.get(vertice);
      let rotulo = this.vertices.get(vertice);
      console.log(`Vértice ${vertice} (${rotulo}): Profundidade de entrada: ${this.listaAdjacencia.get(vertice)?.length || 0}, Profundidade de saída: ${this.listaAdjacencia.get(vertice)?.length || 0}`);
    }
  }

  criarSubgrafo(verticesSelecionados: Set<number>, arestasSelecionadas: Set<[number, number]>): void {
    const subgrafo = new GrafoLib();

    for (const verticeSelecionado of verticesSelecionados) {
      if (this.vertices.has(verticeSelecionado)) {
        const rotulo = this.vertices.get(verticeSelecionado) || "";
        subgrafo.adicionarVertice(verticeSelecionado, rotulo);
      }
    }

    for (const [origem, destino] of arestasSelecionadas) {
      if (subgrafo.vertices.has(origem) && subgrafo.vertices.has(destino)) {
        subgrafo.adicionarAresta(origem, destino);
      }
    }

    subgrafo.imprimirGrafo();
  }


  subgrafoInduzido(verticesX: Set<number>): void {
    const subgrafo = new GrafoLib(false);

    for (const verticeX of verticesX) {
      if (this.vertices.has(verticeX)) {
        const rotulo = this.vertices.get(verticeX) || "";
        subgrafo.adicionarVertice(verticeX, rotulo);
      }
    }

    for (const [origem, destino] of this.listaAdjacencia.entries()) {
      if (verticesX.has(origem)) {
        for (const vizinho of destino) {
          if (verticesX.has(vizinho) && origem < vizinho) {
            subgrafo.adicionarAresta(origem, vizinho);
          }
        }
      }
    }

    subgrafo.imprimirGrafo();
  }





  subtrairVertices(verticesX: Set<number>): void {
    for (const verticeX of verticesX) {
      if (this.vertices.has(verticeX)) {
        const vizinhosX = this.listaAdjacencia.get(verticeX) || [];
        for (const vizinho of vizinhosX) {
          this.removerAresta(vizinho, verticeX);
        }

        const vizinhosDoVertice = this.listaAdjacencia.get(verticeX);
        if (vizinhosDoVertice) {
          for (const vizinho of vizinhosDoVertice) {
            this.removerAresta(verticeX, vizinho);
          }
        }

        this.removerVertice(verticeX);
      }
    }

    this.imprimirGrafo()
  }


  subgrafoArestaInduzido(arestasE: Set<[number, number]>): void {
    const subgrafo = new GrafoLib(false);

    for (const [origem, destino] of arestasE) {
      if (this.vertices.has(origem) && this.vertices.has(destino)) {
        if (!subgrafo.vertices.has(origem)) {
          const rotuloOrigem = this.vertices.get(origem) || "";
          subgrafo.adicionarVertice(origem, rotuloOrigem);
        }
        if (!subgrafo.vertices.has(destino)) {
          const rotuloDestino = this.vertices.get(destino) || "";
          subgrafo.adicionarVertice(destino, rotuloDestino);
        }

        subgrafo.adicionarAresta(origem, destino);

        const vizinhosOrigem = this.listaAdjacencia.get(origem) || [];
        for (const vizinho of vizinhosOrigem) {
          if (vizinho !== destino && arestasE.has([origem, vizinho])) {
            if (!subgrafo.vertices.has(vizinho)) {
              const rotuloVizinho = this.vertices.get(vizinho) || "";
              subgrafo.adicionarVertice(vizinho, rotuloVizinho);
            }
            subgrafo.adicionarAresta(origem, vizinho);
          }
        }
      }
    }

    subgrafo.imprimirGrafo();
  }



  subtrairArestas(arestasE: Set<[number, number]>): void {
    for (const [origem, destino] of arestasE) {
      this.removerAresta(origem, destino);
    }

    this.imprimirGrafo()
  }

  cloneGrafo(original: GrafoLib): GrafoLib {
    const novoGrafo = new GrafoLib(original.usarMatrizAdjacencia);

    for (const [indice, rotulo] of original.vertices.entries()) {
      novoGrafo.adicionarVertice(indice, rotulo);
    }

    for (const [origem, vizinhos] of original.listaAdjacencia.entries()) {
      for (const vizinho of vizinhos) {
        novoGrafo.adicionarAresta(origem, vizinho);
      }
    }

    return novoGrafo;
  }

}
