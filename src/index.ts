import Grafo1 from "./exemplos/Grafo1";
import Grafo2 from "./exemplos/Grafo2";
import kGrafo from "./exemplos/K_grafo";
import { GrafoLib } from "./models/GrafoLib";
import gerarGrafoRegular from "./exemplos/gerarGrafoRegular";
import gerarGrafoBipartido from "./exemplos/gerarGrafoBipartido";
    
console.log("Grafo 1\n")
Grafo1().imprimirGrafo()

console.log("\n")
console.log("Grafo 2\n")
Grafo2().imprimirGrafo()

console.log("\n")
console.log("Grafo completo kn\n");
kGrafo(7);

console.log("Grafo k regular ordem n\n");
gerarGrafoRegular(6, 1)

console.log("\n")
console.log("Verifica bipartição\n")
gerarGrafoBipartido(3,4).imprimirGrafo()
console.log("Bipartido: ")
console.log(gerarGrafoBipartido(3,4).ehBipartido())