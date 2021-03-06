var verticesCaraFrontal = [[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
var verticesCaraLateralIzquierda = [[1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1]];
var verticesCaraLateralDerecha = [[-1,-1,1],[-1,-1,-1],[-1,1,-1],[-1,1,1]];
var verticesCaraSuperior = [[1,1,1],[1,1,-1],[-1,1,-1],[-1,1,1]];
var verticesCaraInferior = [[1,-1,1],[1,-1,-1],[-1,-1,-1],[-1,-1,1]];
var verticesCaraTrasera = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1]];

function Caja(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,imagen,object, objects){
	this.caraFrontal = crearCara(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,verticesCaraFrontal,imagen);
	this.caraTrasera = crearCara(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,verticesCaraTrasera,imagen);
	this.caraLateralIzquierda = crearCara(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,verticesCaraLateralIzquierda,imagen);
	this.caraLateralDerecha = crearCara(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,verticesCaraLateralDerecha,imagen);
	this.caraSuperior = crearCara(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,verticesCaraSuperior,imagen);
	this.caraInferior = crearCara(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,verticesCaraInferior,imagen);
	
	
	////
	var ptoRotacionTapa = new THREE.Mesh(      // Punto de rotación de la tapa
    new THREE.SphereGeometry(0,0,0),
    new THREE.MeshNormalMaterial());
	ptoRotacionTapa.position.set(positionX,positionY+1.5,positionZ+1.5);
	ptoRotacionTapa.add(this.caraFrontal);// Agrego  la cara forntal como hijo del punto de rotación	
	////

	object.add(ptoRotacionTapa);
	object.add(this.caraTrasera);
	object.add(this.caraLateralIzquierda);
	object.add(this.caraLateralDerecha);
	object.add(this.caraSuperior);
	object.add(this.caraInferior);

	objects.push(this.caraFrontal);// Solo se añade la cara que sirve de tapa
	
	//Cambio la posición de la cara frontal para que se ajuste a la posición del pto de Rotación
	this.caraFrontal.position.x=0;
	this.caraFrontal.position.y=-1.5;
	this.caraFrontal.position.z=-1.5;
	
}

function crearCara(sizeX,sizeY,sizeZ,positionX,positionY,positionZ,vertices,imagen){
	var textura = new THREE.ImageUtils.loadTexture(imagen);

	//var material = new THREE.MeshLambertMaterial({color: 0XFFFF00,side:THREE.DoubleSide});
	var material = new THREE.MeshLambertMaterial({ map:textura, side:THREE.DoubleSide} );
	
	var cara = new THREE.Geometry();
	cara.vertices.push(new THREE.Vector3(vertices[0][0]*sizeX,vertices[0][1]*sizeY,vertices[0][2]*sizeZ));
	cara.vertices.push(new THREE.Vector3(vertices[1][0]*sizeX,vertices[1][1]*sizeY,vertices[1][2]*sizeZ));
	cara.vertices.push(new THREE.Vector3(vertices[2][0]*sizeX,vertices[2][1]*sizeY,vertices[2][2]*sizeZ));
	cara.vertices.push(new THREE.Vector3(vertices[3][0]*sizeX,vertices[3][1]*sizeY,vertices[3][2]*sizeZ));

	cara.faces.push(new THREE.Face3(0, 1, 2));//Triangulo inferior
	cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(1,0),new THREE.Vector2(1,1)]);//Mapeo de la textura al triangulo

	cara.faces.push(new THREE.Face3(2, 3, 0));//Triangulo Superior
	cara.faceVertexUvs[0].push([new THREE.Vector2(1,1),new THREE.Vector2(0,1),new THREE.Vector2(0,0)]);

	cara.computeFaceNormals();
    cara.computeVertexNormals();
	
	cuadrado = new THREE.Mesh(cara,material);
	cuadrado.position.set(positionX,positionY,positionZ);

	cuadrado.receiveShadow = true;
	return cuadrado;
}

Caja.prototype.get= function (){
	return this.caraInferior;
}

Caja.prototype.position = function (){
	return this.caraTrasera.position;
}
