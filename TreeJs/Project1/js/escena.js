cuartoPosition = [0,0,2];//Cuarto 2 unidades detras de la camara
camaraPosition = [0,0,0];// Camara en el origen
cuboPosition = [0,0,-12];
cuartoSize = [10,7,30];

function Escena( render , canvasWidth , canvasHeight ) {

	this.render = render;

	this.escena = new THREE.Scene();

	this.camara = initCamara(canvasWidth/canvasHeight,this.escena);

	this.cubo = initCubo(1.7,1.7,1.7,cuboPosition[0],cuboPosition[1],cuboPosition[2]);

	this.cuarto = initCubo(cuartoSize[0],cuartoSize[1],cuartoSize[2],cuartoPosition[0],cuartoPosition[1],cuartoPosition[2]);
	//this.cubo = new Cubo(0,0,-7);
	this.camara.lookAt(this.cubo.position);
	this.luzAmbiente = new THREE.AmbientLight(0XFFFFFF);

	this.lastTime = 0;

	this.positionCameraAnimation = 0;

	this.tipo = 0;

	/*var luz1 = new THREE.PointLight(0xff0044);
	luz1.position.set(-5,0,0);
	this.escena.add(luz1);*/
	this.escena.add(this.camara);
	//agregarCaja(this.escena,this.cubo);
	this.escena.add(this.luzAmbiente);
	
	this.escena.add(this.cubo);

	this.escena.add(this.cuarto);

}

function agregarCaja(escena,cubo){
	escena.add(cubo.getObject()[0]);
	escena.add(cubo.getObject()[1]);
	escena.add(cubo.getObject()[2]);
	escena.add(cubo.getObject()[3]);
	escena.add(cubo.getObject()[4]);
	escena.add(cubo.getObject()[5]);
}

function initCamara(aspectRatio,object){
	camara = new THREE.PerspectiveCamera(45,aspectRatio,0.1,100);
	//camara.position.set(10,0,10);
	camara.position.set(camaraPosition[0],camaraPosition[1],camaraPosition[2]);
	camara.lookAt(object.position);
	return camara;
}

function initCubo(sizeX,sizeY,sizeZ,posX,posY,posZ){
	/*var cuboTextura = new THREE.TextureLoader("img/madera.gif");
	var cuboMaterial = new THREE.MeshBasicMaterial({ map:cuboTextura, side:THREE.DoubleSide });
	var cuboGeometria = new THREE.CubeGeometry(2.5, 2.5, 2.5);
	var cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
	return cubo;
	*/

	var cuboMateriales = [
			new THREE.MeshBasicMaterial({color:0xFF0000,side:THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({color:0x0000FF,side:THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({color:0x00FFFF,side:THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({color:0xFFFF00,side:THREE.DoubleSide}),
			new THREE.MeshBasicMaterial({color:0xFF00FF,side:THREE.DoubleSide})
		];
		var cuboMaterial = new THREE.MeshFaceMaterial(cuboMateriales);
		//var cuboMaterial = new THREE.MeshLambertMaterial({color: 0x9999FF });
		
		var cuboGeometria = new THREE.CubeGeometry(sizeX, sizeY, sizeZ);

		cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
		cubo.position.set(posX,posY,posZ);
		return cubo;
}

function moverCamara(x,y,z){
	this.camara.position.set(x,y,z);
}

Escena.prototype.animarCamara = function(puntos){
	var length = puntos.length;
	moverCamara(puntos[this.positionCameraAnimation][0],0,puntos[this.positionCameraAnimation][1]);
	this.camara.lookAt(this.cubo.position)
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

