import { GrafoLib } from "../models/GrafoLib";
import * as readline from 'readline';

export default function kGrafo(answer: number) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    //rl.question('Insira a quantidade de vértices desejados ', (answer)=> {
    const kgrafo = new GrafoLib;
    var counter;
    var destino;
    var resposta = answer;
    for (counter = 0; counter < resposta; counter++) {
        kgrafo.adicionarVertice(counter);
    }
    for (counter = 0; counter < resposta; counter++) {
        for (destino = counter + 1; destino < resposta; destino++) {
            kgrafo.adicionarAresta(counter, destino);
        }
    }
    kgrafo.imprimirGrafo();
    rl.close();

}