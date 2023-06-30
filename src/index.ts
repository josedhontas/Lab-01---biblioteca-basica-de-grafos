import Grafo1 from "./exemplos/Grafo1";
import Grafo2 from "./exemplos/Grafo2";
import Bipartido from "./exemplos/Bipartido";
import kGrafo from "./exemplos/K_grafo";
import { GrafoLib } from "./models/GrafoLib";
import gerarGrafoRegular from "./exemplos/gerarGrafoRegular";
    
console.log("Grafo 1\n")
Grafo1().imprimirGrafo()

console.log("\n")
console.log("Grafo 2\n")
Grafo2().imprimirGrafo()

console.log("\n")
console.log("Grafo completo kn\n");
kGrafo(5);

//console.log("Grafo k regular ordem n\n");
//gerarGrafoRegular(6, 1)

console.log("\n")
console.log("Bipartido")
console.log(Bipartido(Grafo1()))