var matriz = [];
var grafo = [];
const NOS = 6;
var noInicial;
var pilha = [];
var visitados = []
var matrizAux = []
var proxElem;
var flag;

async function setup() {
  noInicial = parseInt(random(0,5));  
  createCanvas(800,800);
  background(0)
  textSize(32)
  strokeWeight(2)
  var valores = []
  var posicoes = []
  valores.push(0)
  valores.push(1)
  frameRate(0.5)

  //Cria martiz de adjacencia 
  for ( let y = 0; y < NOS; y++ ) {
    matriz[ y ] = [];
    for ( let x = 0; x < NOS; x++ ) {
        matriz[ y ][ x ] = random(valores);
    }
  }
  
  //Arruma vizinhos 
  for(let i = 0; i< NOS; i++){
    matrizAux[i] = []
    for(let k = 0;k <  NOS;k++){
      matrizAux[i].push((matriz[i][k]+matriz[k][i]))
      if(matrizAux[i][k] === 2){
        matrizAux[i][k] = 1;
      }
    }
  }

  //Cria grafo
  for(let i = 0; i < NOS; i++){
    posicoes = calcPosicao(i+1)
    grafo.push(new No(posicoes[0] ,posicoes[1],matrizAux[i],i))
  }
  
  
  console.log("Visitados",visitados)
  
  await DFS(noInicial)

  //console.log(grafo)
  console.log(matriz)
  console.log(matrizAux)
  
}

function calcPosicao(i){
  var posicoes = []

  switch(i){
    case 1:
      posicoes[0] = 250
      posicoes[1] = 250
      break;
    case 2:
      posicoes[0] = 400
      posicoes[1] = 175
    break;
    case 3:
      posicoes[0] = 550
      posicoes[1] = 250
      break;
    case 4:
      posicoes[0] = 250
      posicoes[1] = 500
      break;
    case 5:
      posicoes[0] = 400
      posicoes[1] = 575
      break;
    case 6:
      posicoes[0] = 550
      posicoes[1] = 500
      break;
  }
  return posicoes;
}

async function draw() {
  background(0);
  fill(255)
  noStroke()
  text("DFS",370,100)
  text("Pilha",650,100)
  
  fill(255)
  for(let i = pilha.length-1; i >= 0; i--){
    text(pilha[i].index, 650, 200 + i*50);
  }
   
  for(let i = 0; i < NOS; i++){
    
    fill(255)
    stroke(255)
    for(let j = 0; j < NOS;j++){
        if(grafo[i].vizinhos[j] === 1){
        line(grafo[i].x,grafo[i].y,grafo[j].x,grafo[j].y)
      }
      if(grafo[i].visitado){
        fill(0,255,0)
      }
      circle(grafo[i].x,grafo[i].y,50)
    }
    fill(0)
    text(i,grafo[i].x,grafo[i].y)    
  }

  if(pilha.length === 0 ){
    grafo[proxElem.index].visitado = true;
    visitados.push(grafo[proxElem.index])
    flag = true
    return
  }
  
  if(flag){
    noLoop()
  }

  await DFS(proxElem.index);

}

async function DFS(elemento){
 
  console.log("Elemento sendo visitado: ",elemento)
  grafo[elemento].visitado = true;
  await visitados.push(grafo[elemento])
    for(let i = 0;i < NOS;i++){
      if(grafo[elemento].vizinhos[i] === 1 && grafo[i].visitado === false && grafo[i].naPilha === false){
        pilha.push(grafo[i])
        grafo[i].naPilha = true
      }
    }  
    proxElem = await pilha.shift()
  }

class No{
    constructor(x,y,vizinhos,index,naPilha){
        this.x = x
        this.y = y;
        this.vizinhos = vizinhos;
        this.index = index;
        this.visitado = false
        this.naPilha = false
    }
}


