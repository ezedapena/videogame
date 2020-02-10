//OBJETOS IMPORTANTES DE CANVAS.
var p2 = false
var canvas = document.querySelector ("#canvas");
var ctx = canvas.getContext('2d');
//crear el objeto de la nave
var intro;
	intro = document.createElement("audio");
	document.body.appendChild(intro);
	intro.setAttribute("src","intro.mp3");

var nave = {
	hp: 24,
	x:850,
	y: (canvas.height /2 ) -20,
	width:50,
	height:50,
	image : new Image(),
	contador:0,
	jugador:""
}
var nave2 = {
	hp: 24,
	x:150,
	y: (canvas.height /2 ) -20,
	width:50,
	height:50,
	image : new Image(),
	contador:0,
	jugador:""
}
var nave3 = {
	hp: 20,
	x:450,
	y: (canvas.height /2 ) +40,
	width:50,
	height:50,
	image : new Image(),
	contador:0,
	jugador:""
}
var juego={
	estado:'iniciando'
}
var textoRespuesta ={
	contador:-1,
	titulo:"",
	subtitulo:"",
}
//array para enemigos 
var enemigos=[];
var teclado ={}
var teclado2={}
//array para los disparos
var disparos1Up=[];
var disparos1Down=[];
var disparos1Left=[];
var disparos1Right=[];

var disparos2Up=[];
var disparos2Down=[];
var disparos2Left=[];
var disparos2Right=[];
var disparosEnemigos=[];
//DEFINIR VARIABLES PARA LAS IMAGENES
var fondo;
var sonidodisparo;
var muerte;
var imp;
var soundp1;
//definir funciones
function loadMedia (){
	ctx.fillStyle="white";
	ctx.font = "bold 22px sans-serif";
	ctx.fillText("Player 1 HP: " +nave2.hp,50,100);
	ctx.fillText("Player 2 HP: " + nave.hp,800,100);
	document.getElementById("canvasDiv").style="display:inline"
	fondo = new Image();
	fondo.src = "fondo2.jpg";
	tiro = new Image();
	tiro.src = "rojo.gif";
	tiro2 = new Image();
	tiro2.src = "azul.gif";
	tiromalo = new Image();
	sonidodisparo = document.createElement("audio");
	document.body.appendChild(sonidodisparo);
	sonidodisparo.setAttribute("src","tiro.mp3");
	imp = document.createElement("audio");
	document.body.appendChild(imp);
	imp.setAttribute("src","imp.mp3")
	muerte = document.createElement("audio");
	document.body.appendChild(muerte);
	muerte.setAttribute("src","muert.mp3")
	soundp1 = document.createElement("audio");
	document.body.appendChild(soundp1);
	soundp1.setAttribute("src","unp	.mp3")
	intro.pause();
	soundp1.play();
	nave.image.src= nave.jugador + ".png"
	nave2.image.src=nave2.jugador + ".png"
	fondo.onload= function(){
		var intervalo = window.setInterval(frameloop,1000/55);
	}
}
function elegirJugador() {
	nave.jugador=document.querySelector("input[name=player1]:checked").value
	nave2.jugador=document.querySelector("input[name=player2]:checked").value
}
function dibujarFondo (){
	ctx.drawImage (fondo,0,0);
}
function dibujarNave (nave){
	ctx.save();
	ctx = canvas.getContext('2d');
	ctx.drawImage(nave.image, 
		nave.x, 
		nave.y,
		nave.width, nave.height);
		ctx.restore();
	}
	function agregarEventosTeclado(){
		agregarEventos(document,"keydown",function(e){
			//ponemos en true la tecla presionada
			teclado[e.keyCode]=true;
			teclado2[e.keyCode]=true;
		});
		agregarEventos(document,"keyup",function(e){
			//ponemos en false la tecla que dejo de ser presionada
			teclado[e.keyCode]=false;
			teclado2[e.keyCode]=false;
		});	
		function agregarEventos(elemento,nombreEvento,funcion){
			if (elemento.addEventListener){
				//navegadores de verdad
				elemento.addEventListener(nombreEvento,funcion,false);
			}
			else if (elemento.attachEvent){
				//internet explorer
				elemento.attachEvent(nombreEvento,funcion);
			}
		}
	}
	function moverNave (){
		if (teclado[37]){
			//movimiento a la izquierda
			nave.x-=10;
			if (nave.x<10) {
				nave.x=0;
			}
		}
		if (teclado[39]){
			//movimiento a la izquierda
			var limite = canvas.width - nave.width;
			nave.x+=10;
			if (nave.x>limite) {
				nave.x=limite;
			}
		}
		if (teclado[40]){
			//movimiento a la izquierda
			var limite = canvas.height - nave.height;
			nave.y+=10;
			if (nave.y>limite) {
				nave.y=limite;
			}
		}
		if (teclado[38]){
			//movimiento a la izquierda
			nave.y-=10;
			if (nave.y<10) {
				nave.y=0;
			}
		}
		if (teclado[13]){
			if (!teclado.fire){
				fire();
				teclado.fire=true;
				setTimeout(function(){
					teclado.fire=false;
				},750)
			}
			
		}
		// else {
		// 	teclado.fire=false;	
		// }
		if (nave.estado == "hit"){
			if(nave.hp > 1){
				nave.hp--;
				nave.estado="vivo";
			}else{
				nave.estado="muerto";
				juego.estado="zeke";
				textoRespuesta.titulo= nave2.jugador[0].toUpperCase()+ nave2.jugador.slice(1) + " Wins";
				textoRespuesta.subtitulo="Presiona la tecla R para continuar";
				textoRespuesta.contador=0;

					muerte.pause();
					muerte.currentTime = 0;
					muerte.play();
			}									
		}
	}
	// mover nave 2
	function moverNave2 (){
		if (teclado2[65]){
			//movimiento a la izquierda
			nave2.x-=10;
			if (nave2.x<10) {
				nave2.x=0;
			}
		}
		if (teclado2[68]){
			//movimiento a la derecha
			var limite = canvas.width - nave2.width;
			nave2.x+=10;
			if (nave2.x>limite) {
				nave2.x=limite;
			}
		}
		if (teclado2[83]){
			//movimiento a abajo
			var limite = canvas.height - nave2.height;
			nave2.y+=10;
			if (nave2.y>limite) {
				nave2.y=limite;
			}
		}
		if (teclado2[87]){
			//movimiento a arriba
			nave2.y-=10;
			if (nave2.y<10) {
				nave2.y=0;
			}
		}
		if (teclado2[70]){
			if (!teclado2.fire2){
				fire2();
				teclado2.fire2=true;
				setTimeout(function(){
					teclado2.fire2=false;
				},750)
			}
			
		}
		// else {
		// 	teclado2.fire=false;	
		// }
		if (nave2.estado == "hit"){
			if(nave2.hp > 1){
				nave2.hp--
				nave2.estado="vivo"
			}else{
				nave2.estado="muerto";
				juego.estado="ivan";
				textoRespuesta.titulo=  nave.jugador[0].toUpperCase()+ nave.jugador.slice(1) + " Wins";
				textoRespuesta.subtitulo="Presiona la tecla R para continuar";
				textoRespuesta.contador=0;
									muerte.pause();
					muerte.currentTime = 0;
					muerte.play();
			}
		}
	}
	
	function moverDisparos(){
		for (let i in disparos1Up){
			var disparo= disparos1Up[i];
			disparo.y -= 10	;
		}
		for (let i in disparos1Down){
			var disparo2= disparos1Down[i];
			disparo2.y += 10;	
		}
		disparos1Up=disparos1Up.filter(function(disparo){
			return disparo.y>0;
		})
		disparos1Down=disparos1Down.filter(function(disparo){
			return disparo2.y>0;
		})
		for (let i in disparos1Left){
			var disparo3= disparos1Left[i];
			disparo3.x -= 10	;
		}
		for (let i in disparos1Right){
			var disparo4= disparos1Right[i];
			disparo4.x += 10;	
		}
		disparos1Left=disparos1Left.filter(function(disparo){
			return disparo3.x>0;
		})
		disparos1Right=disparos1Right.filter(function(disparo){
			return disparo4.x>0;
		})
	}
	function moverDisparos2(){
		for (let i in disparos2Up){
			var disparo= disparos2Up[i];
			disparo.y -= 10	;
		}
		for (let i in disparos2Down){
			var disparo2= disparos2Down[i];
			disparo2.y += 10;	
		}
		disparos2Up=disparos2Up.filter(function(disparo){
			return disparo.y>0;
		})
		disparos2Down=disparos2Down.filter(function(disparo){
			return disparo2.y>0;
		})
		for (let i in disparos2Left){
			var disparo3= disparos2Left[i];
			disparo3.x -= 10	;
		}
		for (let i in disparos2Right){
			var disparo4= disparos2Right[i];
			disparo4.x += 10;	
		}
		disparos2Left=disparos2Left.filter(function(disparo){
			return disparo3.x>0;
		})
		disparos2Right=disparos2Right.filter(function(disparo){
			return disparo4.x>0;
		})
	}
	function fire(){
		sonidodisparo.pause();
		sonidodisparo.currentTime = 0;
		sonidodisparo.play();
		disparos1Up.push({
			x:nave.x+20,
			y:nave.y+20,
			width:10,
			height:30
		})
		disparos1Down.push({
			x:nave.x+20,
			y:nave.y+20,
			width:10,
			height:30
		})
		disparos1Left.push({
			x:nave.x+20,
			y:nave.y+20,
			width:10,
			height:30
		})
		disparos1Right.push({
			x:nave.x+20,
			y:nave.y+20,
			width:10,
			height:30
		})
	}
	function fire2(){
		sonidodisparo.pause();
		sonidodisparo.currentTime = 0;
		sonidodisparo.play();
		disparos2Up.push({	
			x:nave2.x+20,
			y:nave2.y+20,
			width:10,
			height:30
		})
		disparos2Down.push({
			x:nave2.x+20,
			y:nave2.y+20,
			width:10,
			height:30
		})
		disparos2Left.push({
			x:nave2.x+20,
			y:nave2.y+20,
			width:10,
			height:30
		})
		disparos2Right.push({
			x:nave2.x+20,
			y:nave2.y+20,
			width:10,
			height:30
		})
	}
	function dibujarDisparos(){
		ctx.save();
		ctx.fillStyle = "white";
		for (var i in disparos1Up){
			var disparo = disparos1Up[i];
			ctx.drawImage(tiro,disparo.x,disparo.y,15,15);
		}
		for (var i in disparos1Down){
			var disparo2 = disparos1Down[i];
			ctx.drawImage(tiro,disparo2.x,disparo2.y,15,15);
		}
		for (var i in disparos1Left){
			var disparo3 = disparos1Left[i];
			ctx.drawImage(tiro,disparo3.x,disparo3.y,15,15);
		}
		for (var i in disparos1Right){
			var disparo4 = disparos1Right[i];
			ctx.drawImage(tiro,disparo4.x,disparo4.y,15,15);
		}
		ctx.restore();
		
	}
	function dibujarDisparos2(){
		ctx.save();
		ctx.fillStyle = "white";
		for (var i in disparos2Up){
			var disparo = disparos2Up[i];
			ctx.drawImage(tiro2,disparo.x,disparo.y,15,15);
		}
		for (var i in disparos2Down){
			var disparo2 = disparos2Down[i];
			ctx.drawImage(tiro2,disparo2.x,disparo2.y,15,15);
		}
		for (var i in disparos2Left){
			var disparo3 = disparos2Left[i];
			ctx.drawImage(tiro2,disparo3.x,disparo3.y,15,15);
		}
		for (var i in disparos2Right){
			var disparo4 = disparos2Right[i];
			ctx.drawImage(tiro2,disparo4.x,disparo4.y,15,15);
		}
		ctx.restore();
	}
	function dibujaTexto (){
		if(textoRespuesta.contador==-1)return;
		var alpha = textoRespuesta.contador;
		if (alpha>0){
			for (var i in enemigos){
				delete enemigos[i];
			}
			for (var i in disparos2Up){
				delete disparos2Up[i];
			}
			for (var i in disparos2Down){
				delete disparos2Down[i];
			}
			for (var i in disparos2Left){
				delete disparos2Left[i];
			}
			for (var i in disparos2Right){
				delete disparos2Right[i];
			}
			for (var i in disparos1Up){
				delete disparos1Up[i];
			}
			for (var i in disparos1Down){
				delete disparos1Down[i];
			}
			for (var i in disparos1Left){
				delete disparos1Left[i];
			}
			for (var i in disparos1Right){
				delete disparos1Right[i];
			}
		}
		ctx.save()
		ctx.globalAlpha = alpha;
		if (juego.estado=="zeke"){
			ctx.fillStyle="white";
			ctx.font="Bold 40pt Arial"
			ctx.fillText (textoRespuesta.titulo,200,200);
			ctx.font="14pt Arial";
			ctx.fillText (textoRespuesta.subtitulo,250,250);
			window.clearInterval()
		}
		if (juego.estado=="ivan"){
			ctx.fillStyle="white";
			ctx.font="Bold 40pt Arial"
			ctx.fillText (textoRespuesta.titulo,600,200);
			ctx.font="14pt Arial";
			ctx.fillText (textoRespuesta.subtitulo,550,250);
			window.clearInterval()
		}
	}
	function actualizarEstadoJuego (){
		if (textoRespuesta.contador>=0){
			textoRespuesta.contador++;
		}
		if ((juego.estado=="zeke" || juego.estado=="ivan") && teclado[82]){
			juego.estado = "iniciando";
			nave.estado="vivo";
			nave.hp = 20;
			nave2.hp = 20;
			nave2.estado="vivo";
			nave.x= 850;
			nave.y=  (canvas.height /2 ) -20;
			nave2.x= 150;
			nave2.y= (canvas.height /2 ) -20;
			textoRespuesta.contador=-1;
		}
	}
	function hit (a,b){
		var hit=false;
		if (b.x + b.width >= a.x && b.x <a.x + a.width){
			if (b.y + b.height >= a.y && b.y < a.y + a.height){
				hit=true;
			}
		}
		if (b.x <= a.x && b.x + b.width > a.x + a.width){
			if (b.y <= a.y && b.y+ b.height > a.y + a.height){
				hit=true;
			}
		}
		if (a.x <= b.x && a.x + a.width > b.x + b.width){
			if (a.y <= b.y && a.y+ a.height > b.y + black.height){
				hit=true;
			}
		}
		return hit;
	}
	function verificarContacto(){
		if (nave2.estado == "hit" || nave2.estado == "muerto") return;
		for (var i in disparos1Up){
			var disparo=disparos1Up[i];
			if (hit (disparo,nave2)){
				nave2.estado="hit";
									imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		
		}
		for (var i in disparos1Down){
			var disparo2=disparos1Down[i];
			if (hit (disparo2,nave2)){
				nave2.estado="hit";
									imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
		for (var i in disparos1Left){
			var disparo3=disparos1Left[i];
			if (hit (disparo3,nave2)){
				nave2.estado="hit";
									imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
		for (var i in disparos1Right){
			var disparo4=disparos1Right[i];
			if (hit (disparo4,nave2)){
				nave2.estado="hit";
									imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
		
		if (nave.estado == "hit" || nave.estado == "muerto") return;
		for (var i in disparos2Up){
			var disparo=disparos2Up[i];
			if (hit (disparo,nave)){
				nave.estado="hit";
					imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
		for (var i in disparos2Down){
			var disparo2=disparos2Down[i];
			if (hit (disparo2,nave)){
				nave.estado="hit";
									imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
		for (var i in disparos2Left){
			var disparo3=disparos2Left[i];
			if (hit (disparo3,nave)){
				nave.estado="hit";
									imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
		for (var i in disparos2Right){
			var disparo4=disparos2Right[i];
			if (hit (disparo4,nave)){
				nave.estado="hit";
									imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
	}
	function aleatorio(inferior,superior){
		var posibilidades = superior-inferior;
		var a = Math.random()*posibilidades;
		a = Math.floor(a);
		return parseInt(inferior)+a;
	}
	function play (){
		if( p2 == false)
		{
			if(document.querySelector("input[name = player2]:checked") != null){
				document.getElementById("panel").style="display:none"
		document.getElementById("coverPage").style="display:none";
				elegirJugador2()
				loadMedia2()
				
			}
			else{
				alert("Please select your character");
			}
		}else{
		if(document.querySelector("input[name = player1]:checked") != null && document.querySelector("input[name = player2]:checked") != null){
			elegirJugador()
			loadMedia()
			document.getElementById("panel").style="display:none"
					intro.pause();
		
		}
		else{
			alert("Please select your characters");
		}
	}
	}
	function coverPage(){
		document.getElementById("coverPage").style="display:none";
		document.getElementById("play").addEventListener("click",play)
			intro.pause();
	intro.currentTime = 0;
	intro.play();
		
	}
	document.getElementById("coverPage").addEventListener("click",coverPage)


function rules(){
	document.getElementById("rules").style="display:inline";
}
	document.getElementById("rulesButton").addEventListener("click",rules)
	function controls(){
		document.getElementById("controls").style="display:inline";
	}
		document.getElementById("controlsButton").addEventListener("click",controls)
function rulesClose(){
	document.getElementById("rules").style="display:none";
}
function controlsClose(){
	document.getElementById("controls").style="display:none";
}
	document.getElementById("accept").addEventListener("click",rulesClose)
	document.getElementById("accept2").addEventListener("click",controlsClose)
	
function dibujaVida(){
	ctx.fillStyle="white";
	ctx.font = "bold 22px sans-serif";
	ctx.fillText("Player 1 HP: " +nave2.hp,50,100);
	ctx.fillText("Player 2 HP: " +nave.hp,800,100);
}
	function frameloop () {
		actualizarEstadoJuego();
		moverNave();
		moverNave2();
		moverDisparos();
		moverDisparos2();
		dibujarFondo();
		verificarContacto();
		dibujarDisparos();
		dibujarDisparos2();
		dibujaTexto();
		dibujaVida();
		dibujarNave(nave);
		dibujarNave(nave2);
	}
	
	//EJECUCION
	agregarEventosTeclado();


	//1 PLAYER
	function loadMedia2 (){
		document.getElementById("canvasDiv").style="display:inline"
		fondo = new Image();
		fondo.src = "fondo2.jpg";
		tiro = new Image();
		tiro.src = "rojo.gif";
		tirobot = new Image();
		tirobot.src = "azul.gif";
		sonidodisparo = document.createElement("audio");
		document.body.appendChild(sonidodisparo);
		sonidodisparo.setAttribute("src","tiro.mp3");
		sonidomalo= document.createElement("audio");
		document.body.appendChild(sonidomalo);
		sonidomalo.setAttribute("src","malardo.mp3");
		imp = document.createElement("audio");
		document.body.appendChild(imp);
		imp.setAttribute("src","imp.mp3")
		muerte = document.createElement("audio");
		document.body.appendChild(muerte);
		muerte.setAttribute("src","muert.mp3")
		soundp1 = document.createElement("audio");
		document.body.appendChild(soundp1);
		soundp1.setAttribute("src","dosp.mp3")
		intro.pause();
		soundp1.play();
		nave3.image.src= nave3.jugador + ".png"
		bot = new Image ();
		bot.src = "elzeke.png"
		fondo.onload= function(){
			var intervalo = window.setInterval(frameloop2,1000/55);
		}
	}
	function elegirJugador2() {
		nave3.jugador=document.querySelector("input[name=player2]:checked").value
	}
	function fire3(){
		sonidodisparo.pause();
		sonidodisparo.currentTime = 0;
		sonidodisparo.play();
		disparos1Up.push({
			x:nave3.x+20,
			y:nave3.y+20,
			width:10,
			height:30
		})
	}


	function verificarContacto2(){
		for (var i in disparos1Up){
			var disparo=disparos1Up[i];
			for (var j in enemigos){
				var enemigo=enemigos[j];
				if (hit (disparo,enemigo)){
					enemigo.estado="hit";
					enemigo.contador=0;
					muerte.pause();
					muerte.currentTime = 0;
					muerte.play();
				}
			}
		}
		if (nave3.estado == "hit" || nave3.estado == "muerto") return;
		for (var i in disparosEnemigos){
			var disparo=disparosEnemigos[i];
			if (hit (disparo,nave3)){
				nave3.estado="hit";
					imp.pause();
					imp.currentTime = 0;
					imp.play();
			}
		}
	
	}
	function dibujarDisparosEnemigos (){
		for (var i in disparosEnemigos){
			var disparo = disparosEnemigos[i];
			ctx.save();
			ctx.fillStyle="yellow";
			ctx.drawImage(tirobot,disparo.x,disparo.y,disparo.width,disparo.height);
			ctx.restore();
		}
	}
	function moverDisparosEnemigos(){
		for (var i in disparosEnemigos){
			var disparo = disparosEnemigos[i];
			disparo.y += 3;	
		}
		disparosEnemigos=disparosEnemigos.filter(function(disparo){
			return disparo.y<canvas.height;
		})
	}
	function dibujarEnemigos (){
		for (var i in enemigos){
			var enemigo = enemigos[i];
			ctx.save();
			if (enemigo.estado=="vivo") ctx.fillStyle="red";
			if (enemigo.estado=="muerto") ctx.fillStyle="black";
			ctx.drawImage(bot,enemigo.x,enemigo.y,enemigo.width,enemigo.height);
		}
	}
	function dibujaTexto2 (){
		if(textoRespuesta.contador==-1)return;
		var alpha = textoRespuesta.contador;
		if (alpha>0){
			for (var i in enemigos){
				delete enemigos[i];
			}
			for (var i in disparosEnemigos){
				delete disparosEnemigos[i];
			}
		}
		ctx.save()
		ctx.globalAlpha = alpha;
		if (juego.estado=="perdido"){
			ctx.fillStyle="white";
			ctx.font="Bold 40pt Arial"
			ctx.fillText (textoRespuesta.titulo,140,200);
			ctx.font="14pt Arial";
			ctx.fillText (textoRespuesta.subtitulo,190,250);
		}
		if (juego.estado=="victoria"){
			ctx.fillStyle="white";
			ctx.font="Bold 40pt Arial"
			ctx.fillText (textoRespuesta.titulo,140,200);
			ctx.font="14pt Arial";
			ctx.fillText (textoRespuesta.subtitulo,190,250);
		}
	}
	function moverNave3 (){
		if (teclado[37]){
			//movimiento a la izquierda
			nave3.x-=10;
			if (nave3.x<10) {
				nave3.x=0;
			}
		}
		if (teclado[39]){
			//movimiento a la izquierda
			var limite = canvas.width - nave3.width;
			nave3.x+=10;
			if (nave3.x>limite) {
				nave3.x=limite;
			}
		}
		if (teclado[40]){
			//movimiento a la izquierda
			var limite = canvas.height - nave3.height;
			nave3.y+=10;
			if (nave3.y>limite) {
				nave3.y=limite;
			}
		}
		if (teclado[38]){
			//movimiento a la izquierda
			nave3.y-=10;
			if (nave3.y<10) {
				nave3.y=0;
			}
		}
		if (teclado[32]){
			if (!teclado.fire3){
					fire3();
					teclado.fire3=true;
					setTimeout(function(){
						teclado.fire3=false;
					},500)
				}
	
		}
		if (nave3.estado == "hit"){
			nave3.contador++;
			if (nave3.contador>=10){
				nave3.contador=0;
				nave3.estado="muerto";
				juego.estado="perdido";
				textoRespuesta.titulo="Game Over";
				textoRespuesta.subtitulo="Presiona la tecla R para continuar";
				textoRespuesta.contador=0;
			}
		}
	}
	function actualizarEstadoJuego2 (){
		if (juego.estado=="jugando" && enemigos.length==0){
			juego.estado="victoria";
			textoRespuesta.titulo="Derrotaste a los enemigos";
			textoRespuesta.subtitulo="Presiona la tecla R para reiniciar";
			textoRespuesta.contador=0;
		}
		if (textoRespuesta.contador>=0){
			textoRespuesta.contador++;
		}
		if ((juego.estado=="perdido" || juego.estado=="victoria") && teclado[82]){
			juego.estado = "iniciando";
			nave3.estado="vivo";
			nave3.x= 450;
			nave3.y = (canvas.height /2 ) +40;
			textoRespuesta.contador=-1;
		}
	}
	function actualizaEnemigos(){
		function agregarDisparosEnemigos (enemigo){
			return{
				x:enemigo.x,
				y:enemigo.y,
				width:10,
				height:33,
				contador:0
			}
		}
		if (juego.estado == 'iniciando'){
			for (var i=0;i<14;i++){
				enemigos.push({
					x:10+(i*50),
					y:10,
					height:40,
					width:40,
					estado:"vivo",
					contador:0
				})
			}
			juego.estado = "jugando"
		}
		for (var i in  enemigos){
			var enemigo=enemigos[i];
			if (!enemigo) continue;
			if (enemigo && enemigo.estado=="vivo") {
				enemigo.contador++;
				enemigo.x += Math.sin(enemigo.contador * Math.PI/90)*5;
	
				if (aleatorio(0,enemigos.length * 10) == 4){
					disparosEnemigos.push(agregarDisparosEnemigos(enemigo))
				}
			}
			if (enemigo && enemigo.estado=="hit"){
				enemigo.contador++;
				if (enemigo.contador>=0){
					enemigo.estado = "muerto";
					enemigo.contador=0;
				}
			}
		}
		enemigos=enemigos.filter(function(enemigo){
			if (enemigo && enemigo.estado != "muerto"){
				return true;
			}
			else {
				return false;
			}
		})
	}


	function frameloop2 () {
		actualizarEstadoJuego2();
		moverNave3();
		actualizaEnemigos();
		moverDisparos();
		moverDisparosEnemigos();
		dibujarFondo();
		verificarContacto2();
		dibujarEnemigos();
		dibujarDisparosEnemigos();
		dibujarDisparos();
		dibujaTexto2();
		dibujarNave(nave3);
		}

		//MAGIA
		function addP2(){
			p2 = true
			document.getElementById("panel-p2").style="display:inline !important"
			document.getElementById("p2Button").style="display:none !important"
		}
		document.getElementById("p2Button").addEventListener("click",addP2)