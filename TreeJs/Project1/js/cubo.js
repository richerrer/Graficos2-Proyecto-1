var verticesCaraFrontal = [[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
var verticesCaraLateralIzquierda = [[1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1]];
var verticesCaraLateralDerecha = [[-1,-1,1],[-1,-1,-1],[-1,1,-1],[-1,1,1]];
var verticesCaraSuperior = [[1,1,1],[1,1,-1],[-1,1,-1],[-1,1,1]];
var verticesCaraInferior = [[1,-1,1],[1,-1,-1],[-1,-1,-1],[-1,-1,1]];
var verticesCaraTrasera = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1]];

function Cubo(positionX,positionY,positionZ){
	this.caraFrontal = crearCara(positionX,positionY,positionZ,verticesCaraFrontal);
	this.caraTrasera = crearCara(positionX,positionY,positionZ,verticesCaraTrasera);
	this.caraLateralIzquierda = crearCara(positionX,positionY,positionZ,verticesCaraLateralIzquierda);
	this.caraLateralDerecha = crearCara(positionX,positionY,positionZ,verticesCaraLateralDerecha);
	this.caraSuperior = crearCara(positionX,positionY,positionZ,verticesCaraSuperior);
	this.caraInferior = crearCara(positionX,positionY,positionZ,verticesCaraInferior);
}

function crearCara(positionX,positionY,positionZ,vertices){
	var material = new THREE.MeshBasicMaterial({color:0x000000,side:THREE.DoubleSide});

	var cara = new THREE.Geometry();
	cara.vertices.push(new THREE.Vector3(vertices[0][0],vertices[0][1],vertices[0][2]));
	cara.vertices.push(new THREE.Vector3(vertices[1][0],vertices[1][1],vertices[1][2]));
	cara.vertices.push(new THREE.Vector3(vertices[2][0],vertices[2][1],vertices[2][2]));
	cara.vertices.push(new THREE.Vector3(vertices[3][0],vertices[3][1],vertices[3][2]));

	cara.faces.push(new THREE.Face3(0, 1, 2));
	cara.faces.push(new THREE.Face3(0, 3, 2));

	cuadrado = new THREE.Mesh(cara,material);
	cuadrado.position.set(positionX,positionY,positionZ);

	return cuadrado;
}

Cubo.prototype.getObject = function (){
	return [this.caraFrontal,this.caraTrasera,this.caraLateralIzquierda,this.caraLateralDerecha,this.caraSuperior,this.caraInferior];
}