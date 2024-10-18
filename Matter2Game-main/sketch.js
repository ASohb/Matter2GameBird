// Módulos do Matter.js
const Motor = Matter.Engine,
      Mundo = Matter.World,
      Corpos = Matter.Bodies,
      SAT = Matter.SAT,
      Collision = Matter.Collision;

// Variáveis principais
var motor, mundo;
var jogador;
var plataformas = [];
var imagemFundo;
var nivelAtual = 1; 
var ovos = 0; 
var ovoColetado= false;
var ninhoEncontrado = false;
var ninho;
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


  iniciarNivel(nivelAtual);
  

 


}

function draw() {
  background(imagemFundo); // Cor do céu
  //image(imagemFundo, 0, 0, windowWidth, windowHeight);
  Motor.update(motor);
push()

  translate(-jogador.corpo.position.x + width / 2, -jogador.corpo.position.y + height / 2);
  
  drawSprites()

 
   // Mostrar jogador e plataformas
   jogador.mostrar();
   ninho.mostrar()

   if (!ovoColetado) { // Só mostrar o ovo se ele não tiver sido coletado
    ovo.mostrar();
    verificarColisaoComOvo(jogador, ovo); // Verificar colisão com o ovo
  }
  if (ovoColetado){
    verificarColisaoComNinho(jogador,ninho)
  }


   for (var plataforma of plataformas) {
     plataforma.mostrar();
 
     // Verificar se o jogador está tocando a plataforma
     if (jogadorTocandoPlataforma(jogador, plataforma)) {
       jogador.resetarPulos(); // Reseta os pulos quando o jogador toca uma plataforma
     }
   }
   pop()
    // Desenhar o texto após o pop() para garantir que ele não seja afetado pela translação
  fill("#0e1e75"); // Cor do texto (branco)
  textSize(32); // Tamanho do texto
  textAlign(LEFT, TOP); // Alinhar à esquerda e ao topo da tela
  text("Ovos: " + ovos, 50, 50); // Posição do texto fixo no canto superior esquerdo
 }
 
 
function iniciarNivel(nivel) {
   nivel1();
 


}

function nivel1(){
  jogador = new Jogador(200, height - 200, 50, 50); // Iniciar próximo à parte inferior

  // Criar plataformas
  plataformas.push(new Plataforma(200, height - 150, 200, 20));
  plataformas.push(new Plataforma(400, height - 300, 200, 20));
  plataformas.push(new Plataforma(500, height - 450, 200, 20));
  plataformas.push(new Plataforma(900, height - 400, 200, 20));
  plataformas.push(new Plataforma(1080, height - 550, 200, 20));
  plataformas.push(new Plataforma(1080, height - 720, 200, 20));

  ovo = new Ovo(400, height - 350, 50, 50); // Posição e tamanho do ovo
  ninho = new Ninho(1080, height - 760, 100, 80)
  
}

function verificarColisaoComOvo(jogador, ovo) {
  // Usando SAT do Matter.js para verificar a colisão
  var colisao = SAT.collides(jogador.corpo, ovo.corpo);

  if (colisao.collided) {
    ovoColetado = true; // Marcar o ovo como coletado
    ovos++; // Incrementar a contagem de ovos
  }
}
// Função de colisão com ninho usando SAT
function verificarColisaoComNinho(jogador, ninho) {
  // Usando SAT do Matter.js para verificar a colisão
  var colisao = SAT.collides(jogador.corpo, ninho.corpo);

  if (colisao.collided) { // Verificar se houve colisão
    ninhoEncontrado = true; 
    alert("Ninho encontrado <3 ")
    
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
