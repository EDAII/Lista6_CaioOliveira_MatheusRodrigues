var matrix = [];
var grafo = [];
const nos = 6;

function setup() {
  createCanvas(800,800);
  background(0)
  textSize(32)
  strokeWeight(2)
  var valores = []
  var posicoes = []
  valores.push(0)
  valores.push(1)
  for ( let y = 0; y < nos; y++ ) {
    matrix[ y ] = [];
    for ( let x = 0; x < nos; x++ ) {
        matrix[ y ][ x ] = random(valores);
    }
  }

  for(let i = 0; i < nos; i++){
    posicoes = calcPosicao(i+1)
    grafo.push(new No(posicoes[0] ,posicoes[1],matrix[i],i))
  }
  
  console.log(grafo)
  console.log(matrix.join('\n'))
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

function draw() {
  for(let i = 0; i < nos; i++){
    
    fill(255)
    stroke(255)
    for(let j = 0; j < nos;j++){
      if(grafo[i].vizinhos[j] === 1){
        line(grafo[i].x,grafo[i].y,grafo[j].x,grafo[j].y)
      }
    }
    circle(grafo[i].x,grafo[i].y,50)
    fill(0)
    text(i,grafo[i].x,grafo[i].y)    
  }
}

class No{
    constructor(x,y,vizinhos,index){
        this.x = x
        this.y = y;
        this.vizinhos = vizinhos;
        this.index = index;
    }
}




