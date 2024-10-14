// Módulos do Matter.js
const Motor = Matter.Engine,
      Mundo = Matter.World,
      Corpos = Matter.Bodies;

// Variáveis principais
var motor, mundo;
var jogador;
var plataformas = [];
var imagemFundo;

function preload() {
  // Carregar a imagem de fundo
  imagemFundo = loadImage('imagens/background/ceuazul.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Cria o canvas em tela cheia

  // Criar o motor de física
  motor = Motor.create();
  mundo = motor.world;
  

  fundo = createSprite(windowWidth / 2, windowHeight / 2)
  fundo.scale=4
  fundo.addImage(imagemFundo)

  // Configurações do jogador
  jogador = new Jogador(200, height - 200, 50, 50); // Iniciar próximo à parte inferior

  // Criar plataformas
  plataformas.push(new Plataforma(200, height - 150, 200, 20));
  plataformas.push(new Plataforma(400, height - 300, 200, 20));
  plataformas.push(new Plataforma(500, height - 450, 200, 20));
  plataformas.push(new Plataforma(900, height - 400, 200, 20));
  plataformas.push(new Plataforma(1080, height - 550, 200, 20));
  plataformas.push(new Plataforma(1080, height - 720, 200, 20));
}

function draw() {
  background(imagemFundo); // Cor do céu
  //image(imagemFundo, 0, 0, windowWidth, windowHeight);
  Motor.update(motor);
  translate(-jogador.corpo.position.x + width / 2, -jogador.corpo.position.y + height / 2);

  drawSprites()
   // Mostrar jogador e plataformas
   jogador.mostrar();
   for (var plataforma of plataformas) {
     plataforma.mostrar();
 
     // Verificar se o jogador está tocando a plataforma
     if (jogadorTocandoPlataforma(jogador, plataforma)) {
       jogador.resetarPulos(); // Reseta os pulos quando o jogador toca uma plataforma
     }
   }
 }
 
 function jogadorTocandoPlataforma(jogador, plataforma) {
   const posicaoJogador = jogador.corpo.position;
   const posicaoPlataforma = plataforma.corpo.position;
 
   // Verificar se o jogador está em cima da plataforma
   const tocando =
     posicaoJogador.y + jogador.altura / 2 >= posicaoPlataforma.y - plataforma.altura / 2 &&
     posicaoJogador.x + jogador.largura / 2 >= posicaoPlataforma.x - plataforma.largura / 2 &&
     posicaoJogador.x - jogador.largura / 2 <= posicaoPlataforma.x + plataforma.largura / 2;
 
   return tocando;
 }


function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    jogador.mover(0.05); // Move para a direita
  } else if (keyCode === LEFT_ARROW) {
    jogador.mover(-0.05); // Move para a esquerda
  } else if (keyCode === UP_ARROW) {
    jogador.pular(); // Pula
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Redimensiona o canvas
}
