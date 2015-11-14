function Escena( render , canvasWidth , canvasHeight ) {

	this.render = render;

	this.escena = new THREE.Scene();

	this.camara = initCamara(canvasWidth/canvasHeight,this.escena);

	this.cubo = initCubo();

	this.lastTime = 0;

	this.positionCameraAnimation = 0;

	this.tipo = 0;

	this.escena.add(this.camara);
	this.escena.add(this.cubo);

}

function initCamara(aspectRatio,object){
	camara = new THREE.PerspectiveCamera(45,aspectRatio,0.1,100);
	camara.position.set(0,0,10);
	camara.lookAt(object.position);
	return camara;
}

function initCubo(){
	var cuboMateriales = [
			new THREE.MeshBasicMaterial({color:0xFF0000}),
			new THREE.MeshBasicMaterial({color:0x00FF00}),
			new THREE.MeshBasicMaterial({color:0x0000FF}),
			new THREE.MeshBasicMaterial({color:0x00FFFF}),
			new THREE.MeshBasicMaterial({color:0xFFFF00}),
			new THREE.MeshBasicMaterial({color:0xFF00FF})
		];
		var cuboMaterial = new THREE.MeshFaceMaterial(cuboMateriales);

		var cuboGeometria = new THREE.CubeGeometry(1.7, 1.7, 1.7);

		cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
		cubo.position.set(1.5, 0.0, -7.0);
		return cubo;
}

function moverCamara(x,y,z){
	this.camara.position.set(x,y,z);
}

Escena.prototype.animarCamara = function(puntos){
	var length = puntos.length;
	moverCamara(puntos[this.positionCameraAnimation][0],0,puntos[this.positionCameraAnimation][1]);
	//this.camara.lookAt(this.escena.position)
	if (this.positionCameraAnimation == length-1)
		this.tipo = 1;
	if (this.positionCameraAnimation == 0)
		this.tipo = 0;

	if(this.tipo == 0)
		this.positionCameraAnimation+=1;
	if(this.tipo == 1)
		this.positionCameraAnimation-=1;
}

Escena.prototype.renderScene = function() {
  this.render.render(this.escena,this.camara);
};

